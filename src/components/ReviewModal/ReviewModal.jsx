import React, { useState } from "react";
import "./ReviewModal.css";
import Rating from "react-rating";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { BASE_URL } from "../../constant";

const ReviewModal = ({
  setShowModal,
  reviewUserName,
  movieId,
  allReviews,
  setAllReviews,
}) => {
  const [rating, setRating] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState("");

  const handleSubmitReview = async () => {
    if (!rating || !review || !reviewUserName || !movieId) {
      toast.error("Please Fill out both the Rating and Review fields.");
      return;
    }
    setIsUploading(true);

    const reviewData = {
      reviewUserName,
      movieId,
      rating,
      description: review,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/review/createReview`,
        reviewData
      );
      console.log(response);
      setIsUploading(false);
      setAllReviews(() => {
        return [...allReviews, reviewData];
      });
      toast.success("Review Has Been Added");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Couldn't Post Review");
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };

  return (
    <div className="modal-overlay">
      <Toaster position="top-center" />
      <div className="modal">
        <div className="modal-header">
          <h2>Add Review</h2>
        </div>
        <div className="modal-body">
          <div className="star-rating">
            <Rating
              emptySymbol={
                <span
                  style={{
                    fontSize: "1.7rem",
                    "@media (min-width: 768px)": {
                      fontSize: "1rem",
                    },
                    color: "#fcd34d",
                    cursor: "pointer",
                  }}
                >
                  &#9734;
                </span>
              }
              fullSymbol={
                <span
                  style={{
                    fontSize: "1.7rem",
                    cursor: "pointer",
                    "@media (min-width: 768px)": {
                      fontSize: "1rem",
                    },
                    color: "#fcd34d",
                  }}
                >
                  &#9733;
                </span>
              }
              //   initialRating={rating}
              onChange={(value) => setRating(value)}
            />
          </div>
          <textarea
            className="review-textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
        </div>
        <div className="modal-footer">
          <button onClick={() => setShowModal(false)} className="close-button">
            Close
          </button>
          <button onClick={handleSubmitReview} className="submit-button">
            {isUploading ? "Adding..." : "Add Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
