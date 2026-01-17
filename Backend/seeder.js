const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/menuSchema');

dotenv.config()

/* ------------------ HELPERS ------------------ */

// Clean HTML from Spoonacular summaries
const cleanSummary = (html = '') =>
  html.replace(/<[^>]*>?/gm, '').slice(0, 220)

// Category config: menu category ↔ Spoonacular type
const CATEGORIES = [
  { name: 'Breakfast', type: 'breakfast', limit: 10 },
  { name: 'Main Dishes', type: 'main course', limit: 15 },
  { name: 'Desserts', type: 'dessert', limit: 10 },
  { name: 'Drinks', type: 'drink', limit: 10 },
]

/* ------------------ SEEDER ------------------ */

const seedMenu = async () => {
  try {
    // 1) Connect DB
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected')

    // 2) Clear old menu
    await MenuItem.deleteMany()
    console.log('🗑️ Old menu items removed')

    let totalInserted = 0

    // 3) Fetch & insert per category
    for (const cat of CATEGORIES) {
      const res = await axios.get(
        'https://api.spoonacular.com/recipes/complexSearch',
        {
          params: {
            apiKey: process.env.SPOONACULAR_API_KEY,
            type: cat.type,
            number: cat.limit,
            addRecipeInformation: true,
          },
        }
      )

      const items = res.data.results.map((recipe) => ({
        name: recipe.title,
        category: cat.name,
        price: Number((recipe.pricePerServing / 100).toFixed(2)), // cents → dollars
        image: recipe.image,
        description: cleanSummary(recipe.summary),
        prepTime: recipe.readyInMinutes,
        available: true,
      }))

      if (items.length) {
        await MenuItem.insertMany(items)
        totalInserted += items.length
        console.log(`🍽️ Seeded ${items.length} items for ${cat.name}`)
      }
    }

    console.log(`✅ Done. Total items seeded: ${totalInserted}`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeder error:', err.message)
    process.exit(1)
  }
}

seedMenu()
