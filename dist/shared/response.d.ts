export declare class Response<T> {
    status?: number;
    data?: T;
    messageEn?: string;
    messageAr?: string;
    constructor(status: number, data: T, messageEn: string, messageAr: string);
}
