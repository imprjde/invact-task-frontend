import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Rating from "react-rating";
import { Toaster, toast } from "sonner";

import "./Details.css";
import { deleteWishlist } from "../../redux/wishlistSlice";
import Reviewcard from "../Reviewcard/Reviewcard";
import ReviewModal from "../ReviewModal/ReviewModal";
import axios from "axios";
import EditReviewModal from "../EditReviewModal/EditReviewModal";
import { BASE_URL } from "../../constant";

export default function Details() {
  const [showModal, setShowModal] = useState(false);
  const [editState, setEditState] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const [reviewUserName, setReviewUserName] = useState(null);
  const [allReviews, setAllReviews] = useState([]);

  const selectedMovie = useSelector((state) => state.selectedMovie);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let userName = localStorage.getItem("userName");
    setReviewUserName(userName);
    if (!selectedMovie) {
      navigate("/");
    }
  }, [selectedMovie, navigate]);

  const handleDeleteWishlist = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${title} from your Wishlist?`
    );
    if (confirmed) {
      try {
        dispatch(deleteWishlist(id));
        toast.info("Movie Deleted From Wishlist Successfully");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        toast.error("Something wen wrong! Try Again");
        console.log(error);
      }
    }
  };

  const handleOpenModel = () => {
    setShowModal(true);
  };

  const handleGetAllReviews = async () => {
    try {
      let resp = await axios.get(
        `${BASE_URL}/review/getReview/${selectedMovie?._id}`
      );
      console.log(resp.data.data);
      setAllReviews(resp.data.data);
    } catch (error) {
      toast.error("Unable to Fetch Reviews");
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="detail-container">
      <Toaster position="top-center" />
      {showModal && (
        <ReviewModal
          movieId={selectedMovie?._id}
          reviewUserName={reviewUserName}
          setShowModal={setShowModal}
          allReviews={allReviews}
          setAllReviews={setAllReviews}
        />
      )}

      {editState && (
        <EditReviewModal
          prefill={prefill}
          allReviews={allReviews}
          setAllReviews={setAllReviews}
          setPrefill={setPrefill}
          setEditState={setEditState}
          movieId={selectedMovie?._id}
        />
      )}
      <div className="detail-card">
        <h1 className="detail-title">{selectedMovie?.title}</h1>
        <p className="detail-description">{selectedMovie?.description}</p>
        <div className="detail-info">
          <span className="detail-genre">{selectedMovie?.genre}</span>
          <span className="detail-year">{selectedMovie?.year.slice(0, 4)}</span>
          <span className="watched-or-not">
            {selectedMovie?.isWatched ? "Watched" : "Unwatched"}
          </span>
        </div>
        <div className="rating-div">
          <span className="detail-rating">
            {" "}
            <span id="rating" className="card-rating">
              <span
                style={{ color: "black", marginRight: "5px", marginTop: "2px" }}
              >
                Rating
              </span>
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
                initialRating={selectedMovie?.rating}
                readonly
              />
            </span>
          </span>
        </div>

        <div className="detail-info">
          <button
            onClick={() =>
              handleDeleteWishlist(selectedMovie._id, selectedMovie.title)
            }
            className="delete-from-wl"
          >
            Delete From Watchlist
          </button>
          <button className="edit-this-wl">
            <Link to="/editmovie">Edit this Movie</Link>
          </button>
          <button onClick={handleOpenModel} className="rate-this-wl">
            Add a review
          </button>
        </div>
      </div>

      <div className="Reviews-Div" id="Reviews-Div">
        {allReviews.length > 0 && (
          <div className="poiuy">
            <span className="tuyio">All User Reviews</span>
          </div>
        )}
        {allReviews.length === 0 && (
          <div className="poiuy">
            <span className="tuyio">No Reviews Yet</span>
          </div>
        )}
        {allReviews?.map((review, index) => (
          <Fragment key={review._id}>
            <Reviewcard
              index={index}
              allReviews={allReviews}
              setAllReviews={setAllReviews}
              id={review._id}
              reviewUserName={review?.reviewUserName}
              rating={review?.rating}
              description={review?.description}
              editState={editState}
              setEditState={setEditState}
              prefill={prefill}
              setPrefill={setPrefill}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
