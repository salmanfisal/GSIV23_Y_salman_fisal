import "../styles/card.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../contextApi/customContext.js";
import Nav from "./nav.js";

function Card({ inputNav, state }) {
  let [movie, setMovie] = useState([]);

  let { handleSearch, input, inputData } = GlobalContext();
  let [currentPage, setCurrentPage] = useState(1);

  let base_url = "https://image.tmdb.org/t/p/w200";
  async function fetching() {
    let apiKey: process.env.REACT_APP_API_KEY;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
      },
    };
    try {
      let response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`,
        options
      );
      let data = await response.json();
      if (data) {
        setMovie((prev) => [...prev, ...data.results]);
        console.log(movie);
      }
    } catch (error) {
      console.log(error);
    }
    if (input) {
      setMovie(input);
      console.log(input);
    }
  }

  useEffect(() => {
    fetching();
  }, [currentPage, input]);

  // const handlePageChange = (newPage) => {
  //   if (newPage >= 1 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //   }
  // };
  useEffect(() => {
    handleSearch(movie);
  }, [handleSearch, movie]);

  useEffect(() => {
    function infiniteScrolling() {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", infiniteScrolling);
    return () => window.removeEventListener("scroll", infiniteScrolling);
  }, [currentPage]);

  return (
    <>
      <div className="navBar">
        <Nav inputNav={inputNav} />
      </div>

      <div className={state ? "inputContainer" : "mainCard"}>
        {movie &&
          movie.map((e) => (
            <div className="cardContainer">
              <div className="card">
                <Link to={`video/${e.id}`} key={e.backdrop_path}>
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
      </div>
      {/* <div className="pagination">
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
          </button> */}
      {/* </div> */}
    </>
  );
}

export default Card;
