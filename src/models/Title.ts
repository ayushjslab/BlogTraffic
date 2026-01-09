import { Schema, model, models, Types } from "mongoose";

export interface ISeoInsights {
  _id: Types.ObjectId;

  websiteId: Types.ObjectId;
  scrapeId: Types.ObjectId;

  titles: string[];
}

const TitleSchema = new Schema<ISeoInsights>(
  {
    websiteId: {
      type: Schema.Types.ObjectId,
      ref: "Website",
      required: true,
      index: true,
    },

    scrapeId: {
      type: Schema.Types.ObjectId,
      ref: "Scrape",
      required: true,
      index: true,
    },

    titles: {
      type: [String],
      default: [],
      validate: {
        validator: (arr: string[]) => arr.length <= 30,
        message: "Titles cannot exceed 50 items",
      },
    },
  },
  {
    timestamps: true,
  }
);

TitleSchema.index({ websiteId: 1, scrapeId: 1 }, { unique: true });

const Title = models.Title ||
  model<ISeoInsights>("Title", TitleSchema);

export default Title
