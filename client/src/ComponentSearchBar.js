import React, {useState} from 'react'

const SearchBar = () => {
    const [first, setRating] = useState("")
    const [last, setName] = useState("")
    const [days, setAuthor] = useState(0)

    const handleRating = (e) => {
        setRating(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleAuthor = (e) => {
        setAuthor(e.target.value)
    }

    let searchClick = (e) => {

    }

    return (
        <section class="search-criteria">
            <div className="form-group">
                <label for="rating">Rating:</label>
                <input type="text" onChange={handleRating} className="form-control" name="rating" id="rating" placeholder="rating"/>
            </div>
            <div className="form-group">
                <label for="Name">Name:</label>
                <input type="text" onChange={handleName} className="form-control" name="Name" id="Name" placeholder="Name"/>
            </div>
            <div className="form-group">
                <label for="Author">Author:</label>
                <input type="text" onChange={handleAuthor} className="form-control" name="Author" id="Author" placeholder="Author"/>
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={searchClick}>Search</button>
            </div>
        </section>
    )
}

export {SearchBar}