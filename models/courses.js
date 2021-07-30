const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const { resolve } = require('path');


class Course {
    constructor(title, price, img){
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid.v4()
    }

    toJSON() {
        return({
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        })
    }

    static async update(course){
        const courses = await Course.getAll(); 

        const inx = courses.findIndex(c => c.id === course.id)
        courses[inx] = course
        
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err) {
                        reject(err)
                    }
                    else{
                        resolve()
                    }
                }
            )
        })
    }


    async save() {
        
        const courses = await Course.getAll(); 

        courses.push(this.toJSON())

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err) {
                        reject(err)
                    }
                    else{
                        resolve()
                    }
                }
            )
        })
    }


    static getAll(){
        return new Promise((resolve, reject) => {   
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err)
                    }else{
                        resolve(JSON.parse(content))
                    }
                }
            )
        })

    }

    static async getId(id) {
        const courses = await Course.getAll(); 
        return courses.find(item => item.id === id)
    }
}

module.exports = Course