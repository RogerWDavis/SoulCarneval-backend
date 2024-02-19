// ReviewEditForm.js
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useParams, useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/Review.module.css";

function ReviewEditForm() {
  const [errors, setErrors] = useState({});
  const [reviewData, setReviewData] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/${id}/`);
        setReviewData(data);
      } catch (err) {
        // Handle error
        console.error(err);
      }
    };
    fetchReview();
  }, [id]);

  const handleChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axiosReq.put(`/reviews/${id}/`, reviewData);
      // Redirect to ReviewsPage after successful edit
      history.push("/reviews");
    } catch (err) {
      // Handle error
      console.error(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className={styles.textFields}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={reviewData?.title || ""}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="content"
          value={reviewData?.content || ""}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  return (
    <Container fluid="md" className={styles.container}>
      <Row>
        <Col sm={12} md={6}>
          <Form onSubmit={handleSubmit} className={styles.form}>
            {textFields}
            <Button type="submit" className={`btn-lg btn-block ${styles.button}`}>
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ReviewEditForm;
