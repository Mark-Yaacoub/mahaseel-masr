export class Response<T> {
    status?: number;
    data?:T ;
    messageEn?: string;
    messageAr?: string;
  
    constructor(status: number, data: T, messageEn: string, messageAr: string) {
      this.status = status;
      this.data = data;
      this.messageEn = messageEn;
      this.messageAr = messageAr;
    }
  }
  