import {
  Container,
  Col,
  Row,
  Card,
  Button,
} from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";
import { removeBookId } from "../utils/localStorage";

import Auth from "../utils/auth";

const SavedBooks = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  const userData = data?.me || {};

console.log("userdata:", error)

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      // Call the removeBook mutation without destructuring
      await removeBook({
        variables: { bookId },
      });
  
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
    <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">Your Saved Books</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {userData.savedBooks && userData.savedBooks.length > 0 ? (
            userData.savedBooks.map((book) => (
              <Col key={book.bookId}>
                <Card border="dark">
                  {book.image && (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />
                  )}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h3>You have no saved books!</h3>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
