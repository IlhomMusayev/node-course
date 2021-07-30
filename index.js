const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');

const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRouters = require('./routes/add')
const cardRouters = require('./routes/card')



const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/' ,homeRoutes)
app.use('/courses' ,coursesRoutes)
app.use('/add' ,addRouters)
app.use('/card', cardRouters)

    


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server runing.... ${PORT}`);
    
})