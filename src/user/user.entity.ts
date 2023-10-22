import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose from 'mongoose';


enum UserRole {
  Admin = 1,
  User = 2,
}

@Schema({ collection: 'users' })
export class User extends Document {
  // @Prop({ type: Number, unique: true })
  // user_id: number;

  @Prop({ type: String, required: true, minlength: 3, maxlength: 16 })
  first_name: string;

  @Prop({ type: String, required: true, minlength: 3, maxlength: 16 })
  last_name: string;

  @Prop({ type: String, required: true , minlength: 3, maxlength: 16 })
  username: string;
  
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: Date, required: true })
  Date_of_birth: Date;

  @Prop({ type: Number, default: 0 })
  verified: number;

  @Prop({ type: Number, enum: UserRole, default: UserRole.User })
  user_role: UserRole;

  @Prop({ type: Number, min: 1000, max: 9999, default: generateRandomOTP })
  otp: number;

  @Prop({ type: String })
  profile_picture: string;

  @Prop({ type: String, required: true })
  password: string;
}

function generateRandomOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
