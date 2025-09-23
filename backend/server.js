require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const monasteryRoutes = require('./routes/monastery')
const fs = require('fs')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/sikkimMonasteries'

mongoose
	.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err.message))

// Serve static images from data/images
const imagesDir = path.join(__dirname, 'data/images')

// Fallback handler FIRST: try alt extension before static 404s
app.get('/images/:file', (req, res, next) => {
	try {
		res.set('Cross-Origin-Resource-Policy', 'cross-origin')
		res.set('Access-Control-Allow-Origin', '*')
		const requested = req.params.file
		const filePath = path.join(imagesDir, requested)
		if (fs.existsSync(filePath)) return res.sendFile(filePath)

		const ext = path.extname(requested).toLowerCase()
		const base = path.basename(requested, ext)
		let altExt = null
		if (ext === '.jpg') altExt = '.jpeg'
		else if (ext === '.jpeg') altExt = '.jpg'

			if (altExt) {
			const altPath = path.join(imagesDir, base + altExt)
			if (fs.existsSync(altPath)) return res.sendFile(altPath)
		}
		return res.status(404).send('Image not found')
	} catch (e) {
		return next(e)
	}
})

	// Then static handler
	app.use('/images', (req, res, next) => {
		res.set('Cross-Origin-Resource-Policy', 'cross-origin')
		res.set('Access-Control-Allow-Origin', '*')
		next()
	})
	app.use('/images', express.static(imagesDir))
	console.log('Serving images from:', imagesDir)

app.use('/api/monasteries', monasteryRoutes)

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
