const nodemailer = require("nodemailer");
const emailTemplate= require("../helpers/emailTemplate")

module.exports = {

    randomStringGenerate: async (req, res) => {
        try {
            return crypto.randomBytes(32).toString("hex");
        } catch (error) {
            console.log("randomString generate error", error);
            throw error;
        }
    },
    getHost: async (req, res) => {
        const host =
            req.headers.host || `${req.hostname}:${req.connection.localPort}`;
        return host;
    },
    nodeMailer: async () => {
        return nodemailer.createTransport({
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
    },
    error: (res, message, err = "") => {
        return res.status(500).json({
            success: false,
            message: message,
            error: err,
        });
    },
    forgetPasswordLinkHTML: async (req, user, resetUrl, subject) => {
        return {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: subject,
            html: emailTemplate,
        };
    },
    success: (res, message, data = {}) => {
        return res.status(200).json({
            success: true,
            message: message,
            data: data,
        });
    },

}