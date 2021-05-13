import React, {useState, useEffect} from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function SearchBooks() {
    const [searches, setSearches] = useState([])
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        loadResults()
    }, [])

    function loadResults() {
        API.getSearchResults()
        .then(res =>
            setSearchResult(res.data)
            )
            .catch(err => console.log(err));
    };

    function handleInputChange(event) {
        const { name, value } = event.target;
        setSearches({...searches, [name]:value})
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if(searches.title) {
            API.getSearchResult({
                image: searches.image,
                title: searches.title,
                author: searches.author,
                description: searches.description,
                link: searches.link
            })
            .then(res => loadResults())
            .catch(err => console.log(err));
        }
    };

    return(
        <Container>
            <Jumbotron>
                <a style={{ fontSize: 60 }}>(React) Google Books Search</a>
            </Jumbotron>
            <Jumbotron>
                <h1 style={{ paddingRight: 850 }}>Book Search</h1>
                <h5 style={{ paddingRight: 850 }}>Book</h5>
                <form>
                    <input
                        placeholder="Title" 
                        style={{ width: 800, marginTop: 35, marginRight: 200}}
                        onChange={handleInputChange}    
                    />
                    <button 
                        disabled={!(searches.title)}
                        style={{marginTop: 40, marginLeft: 700}}
                        onClick={handleFormSubmit}
                    >Search</button>
                </form>
            </Jumbotron>
            <Jumbotron>
                <h5 style={{paddingRight: 1050 }}>Results:</h5>
                {searches.length ? (
                    <CardDeck>
                        {searches.map(search => (
                            <Card key={search._id}>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                <Card.Title>{search.title}</Card.Title>
                                <Card.Text>{search.author}</Card.Text>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                <button to={searches.link}>Click here for more information</button>
                                </Card.Footer>
                            </Card>
                        ))}
            </CardDeck>
                ) : (
                    <h3>No results to display</h3>
                )}
                )
        </Jumbotron>
    </Container>
    )
}

export default SearchBooks;