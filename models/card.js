const path = require('path');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
) 

class Card {
    static async add(course) {
        const card = await Card.fetch() 

        const inx = card.courses.findIndex(c => c.id === course.id)
        const condidate = card.courses[inx]

        if (condidate) {
            condidate.count ++
            card.courses[inx] = condidate
        }else{
            course.count = 1
            card.courses.push(course)
        }


        card.price += +course.price

        return new Promise ((resolve, rejects) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    rejects(err)
                }else{
                    resolve()
                }
            })
        })
    }

    static async remove(id){
        const card = await Card.fetch()
        
        const inx = card.courses.findIndex(c => c.id === id)

        const course = card.courses[inx]


        if (course.count === 1) {
            card.courses = card.courses.filter(c => c.id !== id)

        }else{
            card.courses[inx].count --
        }

        card.price -= course.price 


        return new Promise ((resolve, rejects) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if (err) {
                    rejects(err)
                }else{
                    resolve(card)
                }
            })
        })  
     }

    static async fetch() {
        return new Promise((resolve, rejects) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if(err) {
                    rejects(err)
                }else{
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}


module.exports = Card