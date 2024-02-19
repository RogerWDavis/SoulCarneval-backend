import React from "react";
import styles from "../../styles/Review.module.css";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar"; // Assuming Avatar component is imported
import { axiosReq } from "../../api/axiosDefaults";

const Review = ({
  id,
  owner,
  profile_image, // Ensure profile_image prop is passed
  profile_id,
  title,
  content,
  updated_at,
  currentUser,
  onDelete
}) => {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/reviews/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/reviews/${id}/`);
      onDelete(id); // Notify the parent component about the deletion
    } catch (err) {
      console.error(err);
    }
  };

  const isOwner = currentUser && currentUser.profile_id === profile_id;

  return (
    <Card className={styles.review}>
      <Card.Body>
        <Media className={`align-items-center justify-content-between ${styles.media}`}>
          {/* Render owner's avatar */}
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} /> {/* Pass profile_image prop to Avatar component */}
            {owner}
          </Link>
          <div className={`d-flex align-items-center ${styles.infoContainer}`}>
            <span>{updated_at}</span>
            {isOwner && (
              <div>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        {title && <Card.Title className={`text-center ${styles.title}`}>{title}</Card.Title>}
        {content && <Card.Text className={styles.content}>{content}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default Review;
