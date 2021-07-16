import React, {useState, useEffect} from 'react'
import $ from 'jquery'

const SearchBar = () => {
    const [rating, setRating] = useState("")
    const [name, setName] = useState("")
    const [author, setAuthor] = useState(0)

    useEffect(()=> {
        $('.search-criteria').css("display","none");
    }, [])

    $(window).on('scroll', function() { 
        if ($(window).scrollTop() >= $('.header').offset().top + $('.header').outerHeight()) { 
            $('.search-criteria').css("display","block");
        }
        else {
            $('.search-criteria').css("display","none");
        }
    });

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
        e.preventDefault()
        const url = `/books/?rating=${rating}&name=${name}&author=${author}`
        $.get( url, function( data ) {
            console.log(data)
          }, "json" );
    }

    return (
        <section class="search-criteria">
            <div className="form-group">
                <label for="rating">Rating:</label>
                <input type="text" onChange={handleRating} className="form-control" name="rating" id="rating" placeholder="Rating"/>
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