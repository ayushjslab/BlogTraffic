import { Schema, model, models, Types } from "mongoose";

export interface IWebsite {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  url: string;
  description?: string;
  blogNumber: number;
  blogPostEndPoint: string;
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteSchema = new Schema<IWebsite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      maxlength: 500,
    },

    blogNumber: {
      type: Number,
      default: 0,
      min: 0,
    },

    blogPostEndPoint: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

WebsiteSchema.index({ userId: 1, url: 1 }, { unique: true });

export default models.Website || model<IWebsite>("Website", WebsiteSchema);
