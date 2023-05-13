import mongoose from "mongoose";
import mongoosePaginateV2 from "mongoose-paginate-v2";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book"
      }
    ],
    is_verified: {
      type: Boolean,
      default: false
    },
    verification_code: String,
    mobile_no: String
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

userSchema.plugin(mongoosePaginateV2);

const User = mongoose.model("User", userSchema);

export default User;
