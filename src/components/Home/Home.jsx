import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlist, fetchWishlist } from "../../redux/wishlistSlice";
import Rating from "react-rating";
import { setSelectedMovie } from "../../redux/movieDetailSlice";
import { toast, Toaster } from "sonner";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    setId(userId);
    if (id) {
      setIsLoading(true);
      dispatch(fetchWishlist(id)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, id]);

  const handleViewDetail = (movie) => {
    dispatch(setSelectedMovie(movie));
    navigate("/movie-details");
  };

  const handleDeleteWishlist = (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${title} from your Wishlist?`
    );
    if (confirmed) {
      dispatch(deleteWishlist(id))
        .then(() => {
          toast.success(`${title} deleted successfully from your Wishlist.`);
        })
        .catch((error) => {
          console.error("Error deleting wishlist:", error);
          toast.error("Failed to delete from Wishlist.");
        });
    }
  };

  const handleEditMovie = (movie) => {
    dispatch(setSelectedMovie(movie));
    navigate("/editmovie");
  };

  return (
    <div className="home-container">
      <Toaster position="top-center" />
      {isLoading ? (
        <div className="bo-oader">
          <div className="loader-container">
            <ClipLoader
              className="loaderrrrr"
              color={"#ffffff"}
              loading={isLoading}
              size={150}
            />
          </div>
          <div style={{ marginTop: "30px" }} className="loader-container">
            <span className="ftch">Fetching Your Wishlist...</span>
          </div>
        </div>
      ) : (
        <>
          {wishlist?.data?.length === 0 && (
            <div className="card-container">
              <span className="card-title">
                Sorry!! No Movie Wishlist to Display
              </span>{" "}
              <Link to="/addMovie" className="card-message">
                Create Your First Wishlist Here
              </Link>{" "}
            </div>
          )}

          {wishlist?.data?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "30px",
                }}
              >
                <span
                  style={{
                    fontSize: "25px",
                    fontWeight: "800",
                    color: "white",
                  }}
                >
                  Here are Your Movie Wishlist
                </span>
              </div>

              {wishlist &&
                wishlist?.data?.length > 0 &&
                wishlist?.data?.map((movie, i) => (
                  <div key={movie._id} id="single-card" className="card">
                    <div id="Top" className="card-top">
                      <div id="number" className="card-number">
                        <span>{i + 1})</span>
                        <span id="title" className="card-title">
                          {movie.title}
                        </span>
                      </div>

                      <div id="description" className="card-description">
                        {movie.description}.
                      </div>
                    </div>
                    <div id="Bottom" className="card-bottom">
                      <div id="bottom-left" className="card-bottom-left">
                        <span id="genre" className="card-genre">
                          {movie.genre}
                        </span>
                        <span id="release-year" className="card-release-year">
                          {movie.year.slice(0, 4)}
                        </span>
                      </div>
                      <div id="bottom-center" className="card-bottom-center">
                        <span id="rating" className="card-rating">
                          <Rating
                            emptySymbol={
                              <span
                                style={{
                                  fontSize: "1rem",
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
                                  fontSize: "1rem",
                                  "@media (min-width: 768px)": {
                                    fontSize: "1rem",
                                  },
                                  color: "#fcd34d",
                                }}
                              >
                                &#9733;
                              </span>
                            }
                            initialRating={movie?.rating}
                            readonly
                          />
                        </span>

                        {movie?.isWatched === "watched" ? (
                          <span id="status" className="card-status-watched">
                            Watched
                          </span>
                        ) : (
                          <span id="status" className="card-status">
                            Unwatched
                          </span>
                        )}
                      </div>
                      <div id="bottom-right" className="card-bottom-right">
                        <button
                          onClick={() => handleViewDetail(movie)}
                          className="card-button1"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleEditMovie(movie)}
                          className="card-button2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteWishlist(movie._id, movie.title)
                          }
                          className="card-button3"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
