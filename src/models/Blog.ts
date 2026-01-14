import { Schema, model, models, Types } from "mongoose";

export interface IPost {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  websiteId: Types.ObjectId;
  title: string;
  slug?: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: [{
    name: String,
    volume: Number
  }];
  status?: "draft" | "scheduled" | "published" | "failed";
  scheduledFor?: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    websiteId: { type: Schema.Types.ObjectId, ref: "Website", required: true },

    title: { type: String, required: true },
    slug: { type: String },
    content: { type: String },

    seoTitle: String,
    seoDescription: String,
    keywords: [{
      name: String,
      volume: Number
    }],

    status: {
      type: String,
      enum: ["draft", "scheduled", "published", "failed"],
      default: "draft",
    },

    scheduledFor: Date,
    publishedAt: Date,
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IPost>("Blog", BlogSchema);

export default Blog
