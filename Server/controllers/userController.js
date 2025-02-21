"use strict";

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const helper = require("../helpers/validationJoi");
const Models = require("../models/index");
const secretKey = "secretKey";

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
            throw error
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
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required." });
            }
            const user = await Models.userModel.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const resetToken = Math.random().toString(36).substring(2, 15);
            await Models.userModel.update({ resetToken }, { where: { email } });
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            const resetLink = `http://localhost:3000/users/resetPassword?token=${resetToken}`;
            let mailOptions = {
                from: 'Mitali <mitaligoura@cqlsys.com>',
                to: email,
                subject: "Password Reset Instructions",
                text: `Click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 15 minutes.`,
            };
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: "Reset instructions sent to your email." ,});
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ message: error.message });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const schema = Joi.object({
                token: Joi.string().required(),
                newPassword: Joi.string().min(6).required(),
                confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });
            const { token, newPassword } = value;
            let decoded;
            try {
                decoded = jwt.verify(token, secretKey);
            } catch (err) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }
            const user = await Models.userModel.findOne({ where: { email: decoded.email } });
            if (!user || user.resetToken !== token) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await user.update({ password: hashedPassword, resetToken: null });
            res.json({ message: "Password reset successful." });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

}  
