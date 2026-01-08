import { Schema, model, models, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  image?: string;
  credit: number;
  plan: "free" | "starter" | "pro" | "enterprise";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    image: {
      type: String,
    },

    credit: {
      type: Number,
      default: 0,
      min: 0,
    },

    plan: {
      type: String,
      enum: ["free", "starter", "pro", "enterprise"],
      default: "free",
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", UserSchema);
export default User
