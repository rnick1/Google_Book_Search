import React, {useState, useEffect} from "react";
import { Card, CardDeck } from "react-bootstrap";
import { Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function SearchBooks() {
    const [search, setSearch] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        loadSearchResults()
    }, [])

    // function loadSearchResults() {
    //     API.getSearchResults()
    //     .then(res =>
    //         setSearchResults(res.data)
    //         )
    //         .catch(err => console.log(err));
    // };
// ==============================
function loadSearchResults (query) {
        API.getSearchResults(query)
            .then(res => setSearchResults(res.data))
            .catch(err => console.log(err));
    };
// ===========================
    function handleInputChange(event) {
        const { name, value } = event.target;
        setSearch({...search, value})
    };

// Previously:
// setSearch({...search, [name]:value})


    function handleFormSubmit(event) {
        event.preventDefault();
        if(search) {
            API.getSearchResults({
                image: search.image,
                title: search.title,
                author: search.author,
                description: search.description,
                link: search.link
            })
            .then(res => 
                console.log(res),
                // loadSearchResults()
                )
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
                        // value={search}
                        // name="search"
                        // type="text"
                    />
                    <button 
                        style={{marginTop: 40, marginLeft: 700}}
                        onClick={handleFormSubmit}
                    >Search</button>
                </form>
            </Jumbotron>
            <Jumbotron>
                <h5 style={{paddingRight: 1050 }}>Results:</h5>
                {searchResults.length ? (
                    <CardDeck>
                        {searchResults.map(searchResult => (
                            <Card key={searchResult._id}>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                <Card.Title>{searchResult.title}</Card.Title>
                                <Card.Text>{searchResult.author}</Card.Text>
                                <Card.Text>
                                    {searchResult.description}
                                </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                <button to={searchResult.link}>Click here for more information</button>
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