import './App.css';
import React, {useState} from "react"
import {Books} from './BooksComponent'

function App() {
  const [error, setError] = useState(null)
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const assignSearch = (e) => {
    setSearchTerm(e.target.value)
    if(e.target.value === ""){
      setBooks([])
    }
  }


  const findBook = () => {
    if(searchTerm.trim() !== ""){
      let url = `/books/find/?search=${searchTerm}`
      fetch(url)
        .then((res) => res.json())
        .then((data) => {console.log(data); setBooks(data)})
        .catch((err) => setError(err))
    }

    // let booksContainer = document.getElementsByClassName('books-container')
    // let booksTop = booksContainer.offsetTop
    // console.log(booksTop)
    // window.scrollTo({top: booksTop, behavior: 'smooth'});

  }

  

  return(
    <div className="main-div">
      <div className="overlay">
        <header className="header">
          <div className="title">
            <h1 className="big">WELCOME TO PUBLIC LIBRARY</h1>
            <h1 className="small">Feel free to search within our immense variety of books</h1>
          </div>
          <div className="criteria">
              <div className="search-group">
                <input type="text" className="form-control" onChange={assignSearch} id="searchTerm" name="searchTerm" placeholder="Pride and Prejudice, Harry Poter ..."/>
                <button type="button" className="btn btn-light" onClick={findBook}>Search Book</button>
              </div>
          </div>
        </header>
        <Books books={books} error={error}/>
        <footer className="footer">

        </footer>
      </div>
    </div>
  );
}

export default App;
