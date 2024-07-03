import React from "react";
import "./Reviewcard.css";
import Rating from "react-rating";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "../../constant";

export default function Reviewcard({
  reviewUserName,
  rating,
  description,
  id,
  index,
  setAllReviews,
  setEditState,
  prefill,
  setPrefill,
}) {
  const handleDeleteReview = async () => {
    console.log("THW ID", id);
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDeletion) {
      return;
    }

    try {
      console.log(id);
      const resp = await axios.delete(`${BASE_URL}/review/deleteReview/${id}`);
      console.log(resp.data);
      toast.success("Review has been successfully deleted");
      setAllReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== id)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete the review. Please try again.");
    }
  };

  const handleEditReview = () => {
    let data = {
      index,
      id,
      reviewUserName,
      rating,
      description,
    };
    setPrefill(data);
    setEditState(true);
  };
  return (
    <div>
      {" "}
      <div className="review-card">
        <div className="user-infooo">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{reviewUserName}</h3>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                onClick={handleDeleteReview}
                style={{
                  marginTop: "2px",
                  display: "flex",
                  color: "red",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <MdDelete size={25} />
              </span>
              <span
                onClick={() => handleEditReview()}
                style={{
                  marginLeft: "8px",
                  color: "green",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <FaEdit size={20} />
              </span>
            </span>
          </div>

          <div className="rating">
            <Rating
              emptySymbol={
                <span
                  style={{
                    fontSize: "1.5rem",
                    "@media (min-width: 768px)": {
                      fontSize: "1rem",
                    },
                    color: "#fcd34d",
                  }}
                >
                  &#9734;
                </span>
              }
              fullSymbol={
                <span
                  style={{
                    fontSize: "1.5rem",
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
              readonly
            />
          </div>
        </div>
        <p className="review-description">{description}</p>
      </div>
    </div>
  );
}
