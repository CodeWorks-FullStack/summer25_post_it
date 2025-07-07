import { Schema } from "mongoose";

export const AlbumSchema = new Schema(
  {
    // NOTE the id is handled my mongodb
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    title: { type: String, required: true, minLength: 3, maxLength: 25 },
    description: { type: String, minLength: 15, maxLength: 250 },
    coverImg: { type: String, required: true, maxLength: 500 },
    archived: { type: Boolean, required: true },
    category: { type: String, enum: ['aesthetics', 'food', 'games', 'animals', 'vibes', 'misc'], required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)