export declare class SendEmailService {
    private transporter;
    constructor();
    sendEmailOtp({ recipient, otp }: {
        recipient: any;
        otp: any;
    }): Promise<any>;
}
