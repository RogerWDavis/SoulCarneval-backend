import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Review from "./Review";
import styles from "../../styles/Review.module.css";

function ReviewsPage() {
  const location = useLocation();
  const { id } = useParams();
  const [reviews, setReviews] = useState({ results: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosReq.get(`/reviews/`, {
          params: new URLSearchParams(location.search),
        });
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [location.search, id]); // Added id to dependency array

  const refreshReviews = async () => {
    try {
      const { data } = await axiosReq.get(`/reviews/`, {
        params: new URLSearchParams(location.search),
      });
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.reviewsPage}>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        reviews.results.map((review) => (
          <Review
            key={review.id}
            id={review.id}
            refreshReviews={refreshReviews} // Pass the function down to Review component
            {...review}
          />
        ))
      )}
    </div>
  );
}

export default ReviewsPage;
