const Books = require ("./Books")
const client = require("./db")

exports.showMessage = (req, res) => {
    res.json({message: "Hello from server express!!!"})
}

exports.getBooks = async (req, res) => {
    try{
        let query = `SELECT * FROM public."Books" ORDER BY id ASC `
        const books = await client.query(query)
        if (books.rows.length <= 0) res.status(200).json(`No books to be found`)
            else res.status(200).json(books.rows)
    }
    catch (e){
        console.log(e.stack)
        res.json(e)   
    }
}

exports.find = async (req, res, next) => {
    let searchTerm = req.query.search
    try{
        let like_expression = `Like '%${searchTerm}%'`
        let query = `SELECT * FROM public."Books" WHERE name ${like_expression} ORDER BY name ASC `
        const books = await client.query(query)
        if (books.rows.length <= 0) res.status(200).json(`No books to be found`)
        else res.status(200).json(books.rows)
    }
    catch (e){
        console.log(e.stack)
        res.json(e)   
    }
}