import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Editform.css";
import Rating from "react-rating";
import { useSelector, useDispatch } from "react-redux";
import { updateWishlist } from "../../redux/wishlistSlice";
import { toast, Toaster } from "sonner";

const genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Adventure" },
  { id: 3, genre: "Comedy" },
  { id: 4, genre: "Crime" },
  { id: 5, genre: "Drama" },
  { id: 6, genre: "Romance" },
  { id: 7, genre: "Thriller" },
  { id: 8, genre: "Horror" },
];

export default function Editform() {
  const prefilledMovie = useSelector((state) => state.selectedMovie);
  const [formData, setFormData] = useState(prefilledMovie);
  const [rating, setRating] = useState(prefilledMovie?.rating || 1);
  const [buttonText, setButtonText] = useState("Edit Wishlist");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let date = formatDate(prefilledMovie?.year);
    setFormData({ ...prefilledMovie, year: date });
    setRating(prefilledMovie?.rating || 1);
    if (!prefilledMovie) {
      navigate("/");
    }
  }, [prefilledMovie, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData?.title ||
      !formData?.description ||
      !formData?.year ||
      !formData?.genre ||
      !formData?.isWatched
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    const updatedMovie = {
      ...formData,
      rating: rating,
    };

    try {
      setButtonText("Updating...");
      await dispatch(updateWishlist(updatedMovie));
      toast.success("Watchlist  updated successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error updating Watchlist :", error);
      toast.error("Failed to update Watchlist .");
    } finally {
      setButtonText("Edit Watchlist ");
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toISOString().split("T")[0];
  };
  return (
    <div>
      <Toaster position="top-center" />
      <div className="Movie-form-container">
        <div className="Heading">
          <span className="Inner-heading">Edit Your Movie Watchlist </span>
        </div>
        <div className="Form-div">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="Label" htmlFor="title">
                Movie Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="Input-class"
                value={formData?.title || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="Label" htmlFor="description">
                Movie Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="Input-class"
                value={formData?.description || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="Label" htmlFor="year">
                Release Year:
              </label>
              <div className="input-container" id="date-picker-container">
                <label htmlFor="date-from">Date-Month-Year</label>
                <input
                  type="date"
                  id="year"
                  className="date-field"
                  name="year"
                  value={formData?.year || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ marginTop: "20px" }} className="select">
                <select
                  name="genre"
                  id="genre"
                  value={formData?.genre || ""}
                  onChange={handleChange}
                >
                  <option disabled>Choose a Genre</option>
                  {genres.map(({ genre, id }) => (
                    <option key={id} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
                className="select"
              >
                <select
                  style={{
                    backgroundColor:
                      formData?.isWatched === "watched" ? "#2ecc71" : "#eb2f06",
                  }}
                  onChange={handleChange}
                  value={formData?.isWatched || ""}
                  name="isWatched"
                  id="isWatched"
                  defaultValue={formData?.isWatched}
                >
                  <option disabled>Choose a Genre</option>
                  <option value="watched">Watched</option>
                  <option value="unwatched">Unwatched</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                marginLeft: "10px",
              }}
            >
              <span
                className=""
                style={{ fontWeight: 700, fontSize: "18px", color: "white" }}
              >
                Rate the Movie Here
              </span>
              <span>
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
                  onChange={handleRatingChange}
                />
              </span>
            </div>

            <div style={{ marginTop: "30px" }} className="Div-two">
              <button type="submit" className="Create-button">
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
