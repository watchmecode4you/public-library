import React, {useState} from 'react'
import { PopUp } from './ComponentPopUp'

const Books = (props) => {
  const [seen, setSeen] = useState(false)
  const [chosenBook, setChosenBook] = useState({})
  const [chosenBookError, setchosenBookError] = useState(null)

  let toggle = (e) => {
    if(e.target.parentElement.parentElement !== 'undefined'){
      let id = e.target.parentElement.parentElement.getAttribute('id')
      let url = `/books/find/${id}`
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setChosenBook(data[0])
        setSeen(!seen)
      })
      .catch((err) => setchosenBookError(err))
    }
    else {
      setSeen(!seen)
    }
  }

    if(props.error){
      return (
          <div className="books-container">
            <div className="books-overlay">
              <div className="books">
                <div className="alert alert-danger" role="alert">
                  <span>There is a problem in our system. Please try again shortly</span>
                </div>
              </div>
            </div>
          </div>
      )
    }
    else if(props.books.length <= 0){
        return (
          <div className="books-container">
            <div className="books-overlay">
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
          <div className="books-overlay">
          {seen ? <PopUp toggle={toggle} chosenBook={chosenBook} error={chosenBookError}/> : null}
            <div className="books">
              {props.books.map((value, index) => 
              (
                  <div className="book" key={value.id} id={value.id}>
                    <figure>
                      <img src={`data:image/jpeg;base64,${value.Image}`} alt=""/>
                      <figcaption className="fig-caption">
                        {value.name} <br></br> by <span>{value.author}</span>
                      </figcaption>
                    </figure>
                    <div className="reserved" style={!value.reserved ? true_style : false_style}>
                      <button onClick={toggle}>{!value.reserved ? "Click to reserve" : "Reserved"}</button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

export {Books}