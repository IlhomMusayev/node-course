const { Router } = require('express')
const Card = require('../models/card')
const Course = require('../models/courses')

const router = Router()


router.post('/add', async (req, res) => {
    const course = await Course.getId(req.body.id)
    await Card.add(course)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})


router.get('/', async (req, res) => {
    const card = await Card.fetch() 
    res.render('card', {
        title: 'Basket', 
        isCard: true,
        courses: card.courses,
        price: card.price
    })
})

module.exports = router