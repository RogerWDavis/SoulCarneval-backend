import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Review from "./Review";
import styles from "../../styles/Review.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ReviewsPage() {
  const location = useLocation();
  const { profile_id } = useParams(); // Get profile_id from URL parameters
  const [reviews, setReviews] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const storedProfileId = localStorage.getItem("profileId");
        const currentProfileId = profile_id || (currentUser && currentUser.profile_id) || storedProfileId;
        const { data } = await axiosReq.get("/reviews/", {
          params: {
            profile_id: currentProfileId
          }
        });
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [location.search, profile_id, currentUser]);

  const handleDeleteReview = (deletedReviewId) => {
    // Filter out the deleted review from the reviews list
    const updatedReviews = reviews.results.filter(review => review.id !== deletedReviewId);
    setReviews({ results: updatedReviews });
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
            reviewPage={true}
            currentUser={currentUser}
            onDelete={handleDeleteReview}
            profile_image={review.profile_image} // Passes the profile image URL to the Review component
            {...review}
          />
        ))
      )}
    </div>
  );
}

export default ReviewsPage;
