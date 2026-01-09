import { Schema, Types, model, models } from "mongoose";

export interface IScrapedWebsite {
    websiteId: Types.ObjectId;
    brand: {
        name: string;
        logo?: string;
    };

    seo: {
        topicTheme: string;
        description?: string;
    };

    services: string[];
}


const ScrapedWebsiteSchema = new Schema<IScrapedWebsite>(
    {
        websiteId: {
            type: Types.ObjectId,
            ref: "Website",
            required: true,
        },
        brand: {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            logo: {
                type: String,
                trim: true,
            },
        },

        seo: {
            topicTheme: {
                type: String,
                required: true,
                maxlength: 500,
            },
            description: {
                type: String,
                maxlength: 500,
            },
        },

        services: {
            type: [String],
            default: [],
            validate: {
                validator: (arr: string[]) => arr.length <= 20,
                message: "Services cannot exceed 20 items",
            },
        },
    },
    {
        timestamps: true,
    }
);

const Scrape = models.Scrape ||
    model<IScrapedWebsite>("Scrape", ScrapedWebsiteSchema);

export default Scrape;
