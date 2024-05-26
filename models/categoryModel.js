const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://i0.wp.com/blog.petpooja.com/wp-content/uploads/2021/10/indian.jpg?resize=696%2C385&ssl=1",
    },
  }, { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);