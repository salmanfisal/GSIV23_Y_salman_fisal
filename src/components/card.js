import "./card.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./customContext.js";
import Nav from "./nav.js";

function Card({ inputNav, state }) {
  let [movie, setMovie] = useState("");
  let { handleSearch, input, inputData } = GlobalContext();
  let [currentPage, setCurrentPage] = useState(1);
  let ref = useRef();
  let base_url = "https://image.tmdb.org/t/p/w200";
  const totalPages = 20;

  useEffect(() => {
    async function fetching(page) {
      let apiKey: REACT_APP_API_KEY;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer REACT_APP_AUTHORIZATION",
        },
      };
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`,
          options
        );
        let data = await response.json();
        if (data) {
          handleSearch(data.results);
        }
        ref.current = data.results;
        setMovie(data.results);
      } catch (error) {
        console.log(error);
      }
      if (input) {
        setMovie(input);
        console.log(input);
      }
    }
    fetching(currentPage);
  }, [handleSearch, currentPage, input, inputData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <>
      <div className="navBar">
        <Nav inputNav={inputNav} />
      </div>

      <div className={state ? "inputContainer" : "mainCard"}>
        {movie &&
          movie.map((e) => (
            <div className="cardContainer" key={e.id}>
              <div className="card">
                <Link to={`video/${e.id}`} key={e.id}>
                  <img src={`${base_url}${e.poster_path}`} alt={e.title} />
                </Link>
                <div className="info">
                  <div className="title">
                    {e.title.length > 15
                      ? ` ${e.title.substring(0, 15)}...`
                      : e.title}
                  </div>
                  <div className="desc">
                    {e.overview.length > 60
                      ? `${e.overview.substring(0, 60)}...`
                      : e.overview}
                  </div>
                  <div className="rate">(rating: {e.vote_average})</div>
                </div>
              </div>
            </div>
          ))}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
