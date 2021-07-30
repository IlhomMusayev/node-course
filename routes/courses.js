const { Router } = require('express')
const Course = require('../models/courses')

const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        title: "All course",
        isCourses: true,
        courses     
    })
}) 


router.get('/:id/edit', async (req, res) =>{
    if(!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.getId(req.params.id)

    res.render('course-edit', {
        title: `Edite ${course.title} course`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})  


router.get('/:id', async (req, res) => {

    const course = await Course.getId(req.params.id)

    res.render('course', {
        title: `course ${course.title}`,
        course
    })
})


module.exports = router