const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const { User } = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb+srv://aryanmandya4:n2GfAIip4fJCOIje@cluster0.f9eubjx.mongodb.net/', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await User.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/User', async (req, res) => {
  await User.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:User', async (req, res) => {
  const shortUrl = await User.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);
