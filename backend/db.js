const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://oshapandey8:CAlJc3g0MKtFkrAz@cluster1.vo9r1fc.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    const foodCategoryCollection = mongoose.connection.db.collection("food_category");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItemsData;
    global.food_category = foodCategoryData;

    console.log("Data fetched and stored in global variables.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToDB;
