import mongoose from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: [true, "Video file is required"]
    },
    thumbnail: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      minlength: [15, "Description must be at least 15 characters long"]
    },
    description: {
      type: String,
      required: true,
      minlength: [200, "Description must be at least 200 characters long"]
    },
    duration: {
      type:Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
