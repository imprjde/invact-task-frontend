import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./Addform.css";
import { useDispatch, useSelector } from "react-redux";
import { createWishlist } from "../../redux/wishlistSlice";

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

export default function Addform() {
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    year: "",
    genre: "",
  });
  const [createdByName, setCreatedByName] = useState(null);
  const [createdByEmail, setCreatedByEmail] = useState(null);
  const [createdUserId, setCreatedUserId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.wishlist);

  useEffect(() => {
    let name = localStorage.getItem("userName");
    let email = localStorage.getItem("userEmail");
    let id = localStorage.getItem("userId");
    let obj = { createdByName, createdByEmail };
    console.log(obj);
    setCreatedByName(name);
    setCreatedByEmail(email);
    setCreatedUserId(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const { title, description, year, genre } = movieData;

    if (!title || !description || !year || !genre) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const wishlistData = {
        createdUserId,
        title,
        description,
        year,
        genre,
      };

      await dispatch(createWishlist(wishlistData));

      toast.success("Your Watchlist  is Created");

      setTimeout(() => {
        setMovieData({ title: "", description: "", year: "", genre: "" });
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error creating Watchlist :", error);
      toast.error("Failed to create Watchlist .");
    }
  };

  const handleResetForm = () => {
    setMovieData({
      title: "",
      description: "",
      year: "",
      genre: "",
    });
  };

  return (
    <div>
      <Toaster position="top-center" />
      <div className="Movie-form-container">
        <div className="Heading">
          <span className="Inner-heading">Create Your Movie Watchlist </span>
        </div>
        <div className="Form-div">
          <div>
            <label className="Label" htmlFor="title">
              Movie Title:
            </label>
            <input
              value={movieData.title}
              onChange={(e) =>
                setMovieData({ ...movieData, title: e.target.value })
              }
              type="text"
              id="title"
              name="title"
              className="Input-class"
            />
          </div>
          <div>
            <label className="Label" htmlFor="description">
              Movie Description
            </label>
            <input
              value={movieData.description}
              onChange={(e) =>
                setMovieData({ ...movieData, description: e.target.value })
              }
              type="text"
              id="description"
              name="description"
              className="Input-class"
            />
          </div>

          <div>
            <label className="Label" htmlFor="description">
              Release Year
            </label>
            <div className="input-container" id="date-picker-container">
              <label htmlFor="date-from">Date-Month-Year</label>
              <input
                value={movieData.year}
                onChange={(e) =>
                  setMovieData({ ...movieData, year: e.target.value })
                }
                type="date"
                id="year"
                className="date-field"
                name="year"
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }} className="select">
            <select
              value={movieData.genre}
              onChange={(e) =>
                setMovieData({ ...movieData, genre: e.target.value })
              }
              name="genre"
              id="format"
            >
              <option>Choose a Genre</option>
              {genres.map(({ genre, id }) => (
                <option key={id} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginTop: "30px" }} className="Div-two">
            <button onClick={handleResetForm} className="Reset-button">
              Reset Form
            </button>

            <button onClick={handleSubmit} className="Create-button">
              {status === "loading" ? "Adding..." : "Add Movie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
