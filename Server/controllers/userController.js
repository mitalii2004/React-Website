"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const helper = require("../helpers/validationJoi");
const Models = require("../models/index");
const secretKey = "secretKey";
const commonHelper = require("../helpers/commonHelper");
const crypto = require("crypto");
const Response = require("../helpers/response");

module.exports = {

    signUp: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                userName: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required()
            });

            let payload = await helper.validationJoi(req.body, schema);
            if (!payload) {
                return res.status(400).json({ message: "Invalid request data" });
            }

            let userExist = await Models.userModel.findOne({ where: { email: payload.email } });
            if (userExist) {
                return res.status(400).json({ msg: "User already exists with the same email" });
            }

            const hashedPassword = await bcrypt.hash(payload.password, 10);
            let newUser = await Models.userModel.create({
                name: payload.name,
                userName: payload.userName,
                email: payload.email,
                password: hashedPassword
            });

            return res.status(201).json({ msg: "User registered successfully", user: newUser });

        } catch (error) {
            console.error("Signup error:", error);  // Logs the actual error
            return res.status(500).json({ msg: "Internal server error", error: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const schema = Joi.object({
                search: Joi.string().required(),
                password: Joi.string().required(),
                deviceToken: "abc"
            });
            let payload = await helper.validationJoi(req.body, schema);
            if (!payload) {
                return res.status(400).json({ message: "Invalid request data" });
            }
            const { search, password } = payload;
            const user = await Models.userModel.findOne({
                $or: [
                    { email: search },
                    { userName: search }
                ]
            });
            if (!user) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = {
                    email: search.includes('@') ? search : null,
                    userName: search.includes('@') ? null : search,
                    password: hashedPassword
                };
                const response = await Models.userModel.create(newUser);
                return res.status(201).json({
                    message: `User created successfully.`,
                    user: response
                });
            }
            const token = jwt.sign(
                { id: user.id, email: user.email },
                secretKey,
            );
            user.dataValues.token = token
            return res.status(200).json({
                message: 'Login successful.',
                user
            });
        } catch (error) {
            throw error
        }
    },

    logout: async (req, res) => {
        try {
            console.log(req.body, "hiiiiiiii")
            const schema = Joi.object().keys({
                deviceToken: Joi.string().required().allow(""),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            let logoutDetail = {
                deviceToken: value.deviceToken,
            };
            await Models.userModel.update(logoutDetail, {
                where: { id: req.user.id },
            });
            res.json({ message: "User logout successfully!" });
        } catch (error) {
            throw error
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
            });

            let payload = await helper.validationJoi(req.body, schema);
            const { email } = payload;

            const user = await Models.userModel.findOne({
                where: { email },
            });

            if (!user) {
                return commonHelper.failed(res, Response.failed_msg.noAccWEmail);
            }

            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour expiry

            await Models.userModel.update(
                {
                    resetToken,
                    resetTokenExpires: new Date(Date.now() + 3600000).toISOString(), // ✅ Ensures correct format
                },
                { where: { email } }
            );


            const resetLink = `${req.protocol}://${req.headers.host}/users/resetPassword?token=${resetToken}`;

            const transporter = await commonHelper.nodeMailer();
            const emailTemplate = await commonHelper.forgetPasswordLinkHTML(
                req,
                user,
                resetLink,
                "Reset Password",
                "forgotPassword"
            );

            await transporter.sendMail(emailTemplate);

            return commonHelper.success(res, "Password reset link sent successfully!");
        } catch (error) {
            console.error("Forgot password error:", error);

            return commonHelper.error(
                res,
                Response.error_msg?.forgPwdErr || "Forgot password error",
                error.message
            );
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { token } = req.query;
            if (!token) {
                return res.status(400).json({ success: false, message: "Token is required" });
            }
            const user = await Models.userModel.findOne({
                where: { resetToken: token },
                raw: true
            });
            if (!user || user.resetTokenExpires < new Date()) {
                return res.render("sessionExpire")
            }
            return res.render("changePassword", { data: user })
        } catch (error) {
            console.error("Reset password error:", error);
            return commonHelper.error(
                res,
                Response.error_msg.resetPwdErr,
                error.message
            );
        }
    },

    changePassword: async (req, res) => {
        console.log("req.body", req.body)
        try {
            const schema = Joi.object({
                newPassword: Joi.string().min(6).required(),
                confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required()
                    .messages({ "any.only": "Passwords do not match" }),
            }).unknown(true);

            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { newPassword } = value;

            // Hash new password and update
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await Models.userModel.update({ password: hashedPassword }, { where: { id: req.body.id } });
            res.render("successPassword")
            // return res.status(200).json({ message: "Password reset successfully!" });

        } catch (err) {
            console.error("Error during password reset:", err);
            return res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    resendForgotPasswordLink: async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
            });

            let payload = await helper.validationJoi(req.body, schema);
            const { email } = payload;

            const user = await Models.userModel.findOne({
                where: { email },
            });

            if (!user) {
                return commonHelper.failed(res, Response.failed_msg.noAccWEmail);
            }

            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpires = new Date(Date.now() + 3600000);

            await Models.userModel.update(
                { resetToken, resetTokenExpires },
                { where: { email } }
            );

            const resetUrl = `${req.protocol}://${req.headers.host}/users/resetPassword?token=${resetToken}`;

            const transporter = await commonHelper.nodeMailer();
            const emailTemplate = await commonHelper.forgetPasswordLinkHTML(
                req,
                user,
                resetUrl,
                "Reset Password"
            );

            await transporter.sendMail(emailTemplate);

            return commonHelper.success(res, Response.success_msg.passwordLink);
        } catch (error) {
            console.error("Resend forgot password error:", error);
            return commonHelper.error(res, Response.error_msg.forgPwdErr, error.message);
        }
    },

}  
