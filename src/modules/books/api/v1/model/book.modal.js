import mongoose from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    is_booked: {
      type: String,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

bookSchema.plugin(mongoosePaginateV2);

const Book = mongoose.model("Book", bookSchema);

export default Book;
