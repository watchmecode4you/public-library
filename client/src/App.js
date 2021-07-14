import './App.css';
import React, {useState} from "react"


let Books = (props) => {
  if(props.error){
    return (
      <div className="alert alert-danger" role="alert">
        <span>There is a problem in our system. Please try again shortly</span>
      </div>
    )
  }
  // if(props.input === ""){
  //   return (
  //     <div className="books-container">
  //       <div className="overlay">
  //         <div className="books">
  //           <div className="alert alert-light" role="alert">
  //             <span>There are no books with the value provided in your search</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  else if(props.books.length <= 0){
      return (
        <div className="books-container">
          <div className="overlay">
            <div className="books">
              <div className="alert alert-light" role="alert">
                <span>There are no books with the value provided in your search</span>
              </div>
            </div>
          </div>
        </div>
      )
  }
  else{
    let false_style = {
      backgroundColor : "red",
      color: "white"
    }

    let true_style = {
      backgroundColor : "green",
      color: "white"
    }
    return (
      <div className="books-container">
        <div className="overlay">
          {/* <div className="criteria">
              <div className="search-group">
                <input type="text" className="form-control" onChange={props.assignSearch} id="searchTerm" name="searchTerm" placeholder="Pride and Prejudice, Harry Poter ..."/>
                <button type="button" className="btn btn-light" onClick={props.findBook}>Search Book</button>
              </div>
          </div> */}
          <div className="books">
            {props.books.map((value, index) => 
            (
                <div className="book" key={value.id} id={value.id}>
                  <figure>
                    <img src={`data:image/jpeg;base64,${value.Image}`} alt=""/>
                    <figcaption className="fig-caption">
                      {value.name} <br></br> by {value.author}
                    </figcaption>
                  </figure>
                  <div className="reserved" style={!value.reserved === false ? false_style : true_style}>
                    <button>{!value.reserved ? "Click to reserve" : "RESERVED"}</button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

function App() {
  const [error, setError] = useState(null)
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [inputValue, setInputValue] = useState("")

  // useEffect(() => {
  //   fetch('/books')
  //   .then((res) => res.json())
  //   .then((data) => {console.log(data); setBooks(data)})
  //   .catch((err) => setBooks({error: err}))
  // })

  const assignSearch = (e) => {
    setSearchTerm(e.target.value)
    setInputValue(e.target.value)
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
        <Books books={books} error={error} input={inputValue}/>
        <footer className="footer">

        </footer>
      </div>
    </div>
  );
}

export default App;
