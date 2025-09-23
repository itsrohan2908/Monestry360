require('dotenv').config()
const mongoose = require('mongoose')
const Monastery = require('./models/Monastery')
const data = require('./data/monasteries.json')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/sikkimMonasteries'

;(async () => {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Monastery.deleteMany({})
    const result = await Monastery.insertMany(data)
    console.log(`Data inserted: ${result.length} documents`)
  } catch (err) {
    console.error('Seeding error:', err.message)
  } finally {
    await mongoose.disconnect()
  }
})()
