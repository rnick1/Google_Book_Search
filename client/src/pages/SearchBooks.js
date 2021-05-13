import React, {useState, useEffect} from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function SearchBooks() {
    const [search, setSearch] = useState([])
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
        setSearch({...search, [name]:value})
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if(search.title) {
            API.getSearchResult({
                image: search.image,
                title: search.title,
                author: search.author,
                description: search.description,
                link: search.link
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
                    disabled={!(search.title)}
                    style={{marginTop: 40, marginLeft: 700}}
                    onClick={handleFormSubmit}
                    >Search</button>

                </form>
            </Jumbotron>
            <Jumbotron>
                <h5 style={{paddingRight: 1050 }}>Results:</h5>
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                    <Card.Title>Book Title</Card.Title>
                    <Card.Text>Author</Card.Text>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <button>Click here for more information</button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                    <Card.Title>Book Title</Card.Title>
                    <Card.Text>Author</Card.Text>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <button>Click here for more information</button>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                    <Card.Title>Book Title</Card.Title>
                    <Card.Text>Author</Card.Text>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <button>Click here for more information</button>
                    </Card.Footer>
                </Card>
            </CardDeck>
        </Jumbotron>
    </Container>

    )
}

export default SearchBooks;