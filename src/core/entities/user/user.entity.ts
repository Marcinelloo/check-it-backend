import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

export type UserDocument = HydratedDocument<User>;

export enum ROLE {
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop({
    type: String,
    required: true,
    validate: [/\S+@\S+\.\S+/, 'invalid email'],
    createIndexes: { unique: true },
  })
  email: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop({ enum: ROLE })
  role: ROLE;
  @Prop()
  can_login: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});
