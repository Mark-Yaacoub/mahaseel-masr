import * as jwt from 'jsonwebtoken';


export class JwtVerification{

    async verification(req){
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            const token = req.headers.authorization.split(' ')[1];
            let data;
              jwt.verify(token, 'defaultsecrete', (err, payload) =>{
              data = payload;
            })
            return data;
                }
    }
}