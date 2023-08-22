import React, { useState, useEffect, } from "react";
import "../styles/nav.css";
import { GlobalContext } from "../contextApi/customContext.js";
function Nav({ inputNav }) {
  let base_url = "https://image.tmdb.org/t/p/w200";
  let [nav, setNav] = useState(base_url);
  let [scroll,setScroll] = useState("down")
  let { query, inputData } = GlobalContext();
  let [filterResult, setFilterResult] = useState([]);
  let result = "";
  function inputHandler(e) {
    setNav(e.target.value);
    result = query.filter((e) =>
      e.title.toLowerCase().includes(nav.toLowerCase())
    );
    setFilterResult(result);
    inputNav(result);
  }

  return (
    <>
      <div className="navMainContainer">
        <div className={`navContainer ${scroll === "up" ? "scrollUp" : ""}`}>
          <ul className="navItems">
            <li>
              <input
                className="navInput"
                placeholder="Search"
                type="text"
                onChange={inputHandler}
              />
            </li>
            
            <li><a href="/">home</a></li>
          </ul>
        </div>
        {filterResult.map((movie) => (
          <div key={movie.id} className="navRender">
            <img
              className="navImg"
              src={`${base_url}${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="navContent">
              <h3>{movie.title}</h3>
              <p>Rating :{movie.vote_average}</p>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Nav;
