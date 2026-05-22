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
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"My App" <${process.env.EMAIL_USER}>`,
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