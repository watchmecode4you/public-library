import React, {useState} from 'react'

const PopUp = (props) => {
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [days, setDays] = useState(0)
    const [reserved, setReserved] = useState(null)

    const handleFirst = (e) => {
        setFirst(e.target.value)
    }

    const handleLast = (e) => {
        setLast(e.target.value)
    }

    const handleDays = (e) => {
        setDays(e.target.value)
    }

    const closeClick = (e) => {
        props.toggle(e)
    }

    const reserveClick = (e) => {
        // Simple POST request with a JSON body using fetch
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: props.chosenBook.id,
                firstName: first,
                lastName: last,
                days: days
            })
        };
        fetch(`/reserve/`, requestOptions)
            .then(response => response.json())
            .then(data => {console.log(data); setReserved(data.reserved)});

        props.toggle(e)
    }

    if(props.error){
        return(
            <div className="modal">
                <div className="modal_content">
                    <span className="close small" onClick={closeClick}>&times;</span>
                    <div>
                        <span>We are encountering a connection problem, please come back shortly.</span>
                    </div>
                </div>
            </div>
        )
    }
    else if (!props.chosenBook){
        return null
    }
    else if(props.chosenBook.reserved){
        return(
            <div className="modal">
                <div className="modal_content">
                    <span className="close small" onClick={closeClick}>&times;</span>
                    <div>
                        <span>This book is reserved</span>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="modal">
                <div className="modal_content">
                    <span className="close big" onClick={closeClick}>&times;</span>
                    <div className="form">
                        <form action={`/reserve/${props.chosenBook.id}`}>
                            <div className="form-group">
                                <label for="firstName">First Name:</label>
                                <input type="text" onChange={handleFirst} className="form-control" name="firstName" id="firstName" placeholder="First Name"/>
                            </div>
                            <div className="form-group">
                                <label for="lastname">Last Name:</label>
                                <input type="text" onChange={handleLast} className="form-control" name="lastName" id="lastName" placeholder="Last Name"/>
                            </div>
                            <div className="form-group">
                                <label for="period">Estimated Usage Period:</label>
                                <input type="number" onChange={handleDays} className="form-control" name="period" id="period" placeholder="Period in days"/>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-primary" onClick={reserveClick}>Reserve</button>
                            </div>
                            <div className="quote">
                                <span>Happy Reading!</span>
                            </div>
                        </form>
                    </div>
                    <div className="cover-photo">
                         <figure>
                          <img src={`data:image/jpeg;base64,${props.chosenBook.Image}`} alt=""/>
                          <figcaption className="fig-caption">
                            {props.chosenBook.name} <br></br> by <span>{props.chosenBook.author}</span>
                          </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        )
    }
}

export {PopUp}