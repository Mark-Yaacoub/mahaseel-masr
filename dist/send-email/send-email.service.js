"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let SendEmailService = class SendEmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.userEmail,
                pass: process.env.passEmail,
            },
            secure: true,
            disableUrlAccess: true,
            disableFileAccess: true,
        });
    }
    async sendEmailOtp({ recipient, otp }) {
        const recipientName = recipient.split('@')[0];
        const htmlContent = `
  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f3f3; padding: 20px; text-align: left; direction: ltr;">
  <div style="background-color: #ffffff; border-radius: 5px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333333;">OTP Verification</h2>
    <p style="color: #666666;">Dear ${recipientName}</p>
    <p style="color: #666666;">Your OTP is: ${otp}</p>
    <p style="color: #666666;">Please use this OTP to verify your account.</p>
    <p style="color: #666666;">For security reasons, do not share this OTP with anyone.👌</p>
    <p style="color: #666666;">If you didn't request this OTP, please ignore this message.</p>

   
    <p style="color: #666666;">If you have any questions or need assistance, please don't hesitate to contact our support team at [support@restomanager.com] or call [01281151982].</p>
    <p style="color: #666666;">Thank you for using our services.</p>
    <p style="color: #666666;">Best regards,<br>[mahaseel Masr Team]</p>
  </div>
</body>
</html>

  
  `;
        const mailOptions = {
            from: process.env.userEmail,
            to: recipient,
            subject: 'To Verify Your Account',
            html: htmlContent,
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                throw error;
            }
            else {
                console.log('Email sent successfully:', info.response);
            }
        });
    }
    async sendEmailNewPassword({ recipient, password }) {
        const recipientName = recipient.split('@')[0];
        const htmlContent = `
   
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f3f3; padding: 20px; text-align: left; direction: ltr;">
  <div style="background-color: #ffffff; border-radius: 5px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333333;">Password Reset</h2>
    <p style="color: #666666;">Dear ${recipientName}</p>
    <p style="color: #666666;">Your New Password is: ${password}</p>
    <p style="color: #666666;">Please use this password to log in to your account. </p>
    <p style="color: #666666;">For security reasons, we recommend that you log in to your account and change the password to something more memorable. 👌</p>
    <p style="color: #666666;">If you didn't request this change, please contact our support team immediately at [support@mahaseel.com] or call [01281151982].</p>

   
    <p style="color: #666666;">If you have any questions or need assistance, please don't hesitate to contact our support team at [support@mahaseel.com] or call [01281151982].</p>
    <p style="color: #666666;">Thank you for using our services.</p>
    <p style="color: #666666;">Best regards,<br>[mahaseel Masr Team]</p>
  </div>
</body>
</html>

    `;
        const mailOptions = {
            from: process.env.userEmail,
            to: recipient,
            subject: 'Password Reset',
            html: htmlContent,
        };
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
            }
        });
    }
};
exports.SendEmailService = SendEmailService;
exports.SendEmailService = SendEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SendEmailService);
//# sourceMappingURL=send-email.service.js.map