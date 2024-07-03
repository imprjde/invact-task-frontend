import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { BASE_URL } from "../../constant";

const EditReviewModal = ({
  setEditState,
  movieId,
  allReviews,
  setAllReviews,
  prefill,
}) => {
  const [rating, setRating] = useState(prefill.rating || 0);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState(prefill.description || "");

  useEffect(() => {
    setRating(prefill.rating || 0);
    setReview(prefill.description || "");
  }, [prefill]);

  const handleUpdateReview = async () => {
    if (!rating || !review || !movieId) {
      toast.error("Please fill out both the Rating and Review fields.");
      return;
    }
    setIsUploading(true);

    const reviewData = {
      reviewUserName: prefill.reviewUserName,
      movieId,
      rating,
      description: review,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/review/updateReview/${prefill?.id}`,
        reviewData
      );
      console.log(response);
      const updatedReview = {
        ...prefill,
        rating,
        description: review,
      };
      const updatedReviews = allReviews.map((item, index) =>
        index === prefill.index ? updatedReview : item
      );

      setAllReviews(updatedReviews);

      setIsUploading(false);
      toast.success("Review has been successfully updated");
      setEditState(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong! Try Again");
      setTimeout(() => {
        setEditState(false);
      }, 3000);
    }
  };

  return (
    <div className="modal-overlay">
      <Toaster position="top-center" />
      <div className="modal">
        <div className="modal-header">
          <h2>Edit Review</h2>
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
              initialRating={rating}
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
          <button onClick={() => setEditState(false)} className="close-button">
            Close
          </button>
          <button onClick={handleUpdateReview} className="submit-button">
            {isUploading ? "Updating..." : "Update Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
