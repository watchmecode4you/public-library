const Books = require ("./Books")
const client = require("./db")


function getTodayDate() {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2,'0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    return `${mm}/${dd}/${yyyy}`
}

exports.showMessage = (req, res) => {
    res.json({message: "Hello from server express!!!"})
}

exports.getBooks = async (req, res) => {
    try{
        let query = ""
        let books = {}
        if(!req.query.rating & !req.query.name & !req.query.author){
            let query = `SELECT * FROM public."Books" ORDER BY id ASC `
            const books = await client.query(query)
            if (books.rows.length <= 0) res.status(200).json(books.rows)
            else res.status(200).json(books.rows)
        }else{
            let query = `SELECT * FROM public."Books" WHERE ORDER BY id ASC `
        }
    }
    catch (e){
        console.log(e.stack)
        res.json(e)   
    }
}

exports.find = async (req, res, next) => {
    let searchTerm = req.query.search.trim().toLowerCase()
    try{
        let like_expression = `Like '%${searchTerm}%'`
        let query = `SELECT * FROM public."Books" WHERE LOWER(name) ${like_expression} ORDER BY name ASC `
        const books = await client.query(query)
        if (books.rows.length <= 0) res.status(200).json(books.rows)
        else res.status(200).json(books.rows)
    }
    catch (e){
        console.log(e.stack)
        res.json(e)   
    }
}

exports.findbyId = async (req, res) => {
    let id = req.params.id
    console.log(id)
    try{
        let query = `SELECT * FROM public."Books" WHERE id = $1 ORDER BY name ASC`
        const books = await client.query(query, [id])
        if (books.rows.length <= 0) res.status(200).json(books.rows)
        else res.status(200).json(books.rows)
    }
    catch(e) {
        console.log(e.stack)
        res.json(e)   

   }
}

exports.reserve = async (req, res, next) => {
    let firstName = req.body.firstName.trim()
    let lastName = req.body.lastName.trim()
    let days = req.body.days
    let id = req.body.id
    try{
        let query = `SELECT * FROM public."Books" WHERE id = $1`
        const books = await client.query(query, [id])
        if (books.rows.length === 1 && !books.rows[0].reserved) {
            let update_query = `UPDATE public."Books" SET reserved = true WHERE id = $1;`
            const result = await client.query(update_query, [id])
            let add_reservation_query = `insert into "Reservations" (first_name, last_name, estimated_usage_period, date, book_reserved) values ($1, $2, $3, $4, $5)`
            const add_result = await client.query(add_reservation_query, [firstName, lastName, days, getTodayDate(), id])
            let check_updated_book_query = `SELECT * FROM public."Books" WHERE id = $1`
            const books = await client.query(check_updated_book_query, [id])
            console.log(books.rows[0])
            res.status(200).json({message: "Reservation completed!", reserved: books.rows[0].reserved})
        }
        else if (books.rows.length === 1 && books.rows[0].reserved){
            res.status(200).json({message: "Book is already reserved"})
        }
        else res.status(200).json({message: "Kindly refresh the page and try later"})
    }
    catch(e) {
        console.log(e.stack)
        res.json(e)
    }
}