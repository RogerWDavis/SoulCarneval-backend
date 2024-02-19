import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import styles from "../../styles/Review.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useCurrentUser } from "../../contexts/CurrentUserContext"; // Import the hook to fetch the current user's profile ID

function ReviewCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [reviewData, setReviewData] = useState({
    title: "",
    content: "",
    rating: "", 
    // Remove profile_id from here as we'll automatically fetch it
  });
  const { title, content, rating } = reviewData;
  const history = useHistory();
  const currentUser = useCurrentUser(); // Fetch the current user's data including profile ID

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("rating", rating);
    formData.append("profile_id", currentUser.profile_id); // Automatically include the profile ID from the current user
  
    try {
      await axiosReq.post("/reviews/", formData);
      history.push("/reviews"); // Redirect to ReviewsPage
    } catch (err) {
      // Handle errors
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Container fluid="md" className={styles.container} style={{ zIndex: 9999 }}>
      <Row>
        <Col sm={12}>
          <Form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.textFields}>
              <Form.Group>
                <Form.Label>Song or Album Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="Input album or song title"
                />
              </Form.Group>
              {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group>
                <Form.Label>Review Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="content"
                  value={content}
                  onChange={handleChange}
                  placeholder="Input review content"
                />
              </Form.Group>
              {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  value={rating}
                  onChange={handleChange}
                  min={1} // Set the minimum rating value
                  max={5} // Set the maximum rating value
                  placeholder="Rate from 1 to 5"
                />
              </Form.Group>
              {errors?.rating?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
            </div>
            <Button
              type="submit"
              className={`btn-lg btn-block ${btnStyles.Btn} ${styles.button}`}
            >
              Create Review
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ReviewCreateForm;
