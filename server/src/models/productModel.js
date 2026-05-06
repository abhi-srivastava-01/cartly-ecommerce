import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description too short"],
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },

    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          if (value == null) return true;
          return value < this.price;
        },
        message: "Discount price must be less than actual price",
      },
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },

    // images: [
    //   {
    //     url: {
    //       type: String,
    //       required: true,
    //     },
    //     public_id: String,
    //   },
    // ],

    variants: [
      {
        size: String,
        color: String,
        stock: Number,
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },

    stock: {
      type: Number,
      min: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
        rating: Number,
        comment: String,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
    },

    tags: [String],
  },
  {
    timestamps: true,
  },
);

productSchema.index({
  name: "text",
  tags: "text",
});
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
const Product = mongoose.model("Product", productSchema);

export { Product };
