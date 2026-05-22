import nodemailer from "nodemailer";

export async function sendMail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SENDER_SMTP_HOST,
            port: Number(process.env.EMAIL_SENDER_SMTP_PORT),
            secure: Number(process.env.EMAIL_SENDER_SMTP_PORT) === 465,
            auth: {
                user: process.env.EMAIL_SENDER_SMTP_USER,
                pass: process.env.EMAIL_SENDER_SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_SENDER_SMTP_FROM,
            to,
            subject,
            html,
        });

        return {
            success: true,
            messageId: info.messageId,
        };
    } catch (error) {
        console.log("Email error:", error);
        return {
            success: false,
            error: "Failed to send email",
        };
    }
}