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

const twilio = require("twilio");
const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

module.exports = {

    signUp: async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                userName: Joi.string().required(),
                phoneNumber: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().min(6).required(),
                deviceToken: Joi.string().optional()
            });

            let payload = await helper.validationJoi(req.body, schema);
            if (!payload) {
                return res.status(400).json({ message: "Invalid request data" });
            }
            let userExist = await Models.userModel.findOne({ where: { email: payload.email } });
            if (userExist) {
                return res.status(400).json({ msg: "User already exists with the same email" });
            }
            let phoneNumber = payload.phoneNumber;
            let countryCode = "";
            if (phoneNumber.startsWith("+")) {
                let splitArray = phoneNumber.slice(1).split("");
                countryCode = splitArray.splice(0, 2).join("");
                phoneNumber = splitArray.join("");
                if (countryCode === "91") {
                    countryCode = "";
                }
            }
            const formattedPhone = `+${countryCode}${phoneNumber}`;
            await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
                .verifications
                .create({ to: formattedPhone, channel: "sms" });

            return res.status(200).json({
                msg: "OTP sent successfully. Please verify your OTP to complete registration.",
                phoneNumber: formattedPhone
            });
        } catch (error) {
            throw error
        }
    },

    otpVerify: async (req, res) => {
        try {
            const schema = Joi.object({
                phoneNumber: Joi.string().required(),
                otp: Joi.string().required(),
            });
            let payload = await helper.validationJoi(req.body, schema);
            if (!payload) {
                return res.status(400).json({ message: "Invalid request data" });
            }
            let phoneNumber = payload.phoneNumber;
            let countryCode = "";
            if (phoneNumber.startsWith("+")) {
                let splitArray = phoneNumber.slice(1).split("");
                countryCode = splitArray.splice(0, 2).join("");
                phoneNumber = splitArray.join("");
                if (countryCode === "91") {
                    countryCode = "";
                }
            }
            let user = await Models.userModel.findOne({
                where: { phoneNumber: phoneNumber },
                raw: true
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
            user.token = token
            return res.status(200).json({ msg: "OTP verified successfully", user });
        } catch (error) {
            throw error;
        }
    },

    login: async (req, res) => {
        try {
            const schema = Joi.object({
                userDetail: Joi.string().required(),
                password: Joi.string().required(),
                deviceToken: Joi.string().optional()
            });
            let payload = await helper.validationJoi(req.body, schema);
            if (!payload) {
                return res.status(400).json({ message: "Invalid request data" });
            }
            const { userDetail, password } = payload;
            const isEmail = userDetail.includes("@");
            const user = await Models.userModel.findOne({
                where: isEmail ? { email: userDetail } : { userName: userDetail }
            });
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            const token = jwt.sign(
                { id: user.id, email: user.email },
                secretKey,
                { expiresIn: "1h" }
            );
            return res.status(200).json({
                message: "Login successful.",
                user: { ...user.toJSON(), token }
            });
        } catch (error) {
            throw error
        }
    },

    logout: async (req, res) => {
        try {
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
            const user = await Models.userModel.findOne({ where: { email: email } });

            if (!user) {
                return commonHelper.error(res, Response?.failed_msg?.noAccWEmail || "No account found with this email.");
            }

            const resetToken = crypto.randomBytes(32).toString("hex");
            const resetTokenExpires = new Date(Date.now() + 3600000).toISOString(); // 1 hour expiry

            await Models.userModel.update(
                { resetToken, resetTokenExpires },
                { where: { email: email } }
            );
            const resetLink = `${req.protocol}://${req.get("host")}/users/resetPassword?token=${resetToken}`;
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
                Response?.error_msg?.forgPwdErr || "Forgot password error",
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
