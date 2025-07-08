import { Schema } from "mongoose";

export const WatcherSchema = new Schema(
  {
    accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    albumId: { type: Schema.ObjectId, required: true, ref: 'Album' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

WatcherSchema.virtual('profile', {
  localField: 'accountId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

WatcherSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  ref: 'Album',
  justOne: true
})