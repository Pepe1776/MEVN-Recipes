module.exports = mongoose => {
  const Recipe = mongoose.model(
    "recipe",
    mongoose.Schema(
      {
        title: String,
        description: String,
            ingredients: Array,
            methods: Array,
            ingredientRows: Number,
            methodRows: Number,
            image: String,
        
      },
      { timestamps: true }
    )
  );
    
  return Recipe;
};