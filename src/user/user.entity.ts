import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


enum UserRole {
  Admin = 1,
  User = 2,
}

@Schema({ collection: 'users' })
export class User extends Document {

  @Prop({ type: String, required: true, minlength: 3, maxlength: 16  })
  firstName: string;
  
  @Prop({ type: String, required: true, minlength: 3, maxlength: 16 })
  lastName: string;

  @Prop({ type: String, required: false , minlength: 3, maxlength: 16  })
  userName: string;
  
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;

  @Prop({ type: Number, default: 0 })
  verified: number;

  @Prop({ type: Number, enum: UserRole, default: UserRole.User })
  userRole: UserRole;

  @Prop({ type: Number, min: 1000, max: 9999, default: generateRandomOTP })
  otp: number;

  @Prop({ type: String })
  profilePicture: string;

  @Prop({ type: String, required: true })
  password: string;
}

function generateRandomOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
