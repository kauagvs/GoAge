const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const ageEmpty = (req, res, next) => {
  const age = req.query.age
  if (age) {
    return next()
  } else {
    return res.redirect('/')
  }
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', ageEmpty, (req, res) => {
  const age = req.query.age
  return res.render('major', { age })
})

app.get('/minor', ageEmpty, (req, res) => {
  const age = req.query.age
  return res.render('minor', { age })
})

app.listen(3000)
