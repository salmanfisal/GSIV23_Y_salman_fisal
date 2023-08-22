import React from "react";
import "../styles/details.css";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../contextApi/customContext.js"
function Details() {
  let { id } = useParams();
  let { query } = GlobalContext();
  let selected = query.find((e) => e.id.toString() === id);
  console.log(query)
  console.log(id)
  return (
    <div className="details">
      {selected && (
        <div className="detailsContainer">
          <img
            className="detailsImg"
            src={`https://image.tmdb.org/t/p/w400${selected.backdrop_path}`}
            alt={selected.original_title}
          />
          <div className="detailsContent">
          <div className="detailsTitle">
            <h1>{selected.original_title}</h1>
            <p className="rating">(Rating : {selected.vote_average})</p>
          </div>
          <div className="detailsOverview">
            <p>{selected.release_date}</p>
            <p className="detailsDesc">{selected.overview}</p>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
