import React from "react";

const Artist = ({ artist }) => {
  if (!artist) return null;

  const { images, name, followers, genres, uri } = artist;

  let capitalize_firstLetter = string =>
    string
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + string.slice(1);

  let numberWithCommas = x =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="artist__info">
      <h3>
        <strong>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/search?q=${name}`}
            className="artist-name"
          >
            {name}
          </a>
        </strong>
      </h3>
  
      <h4>{numberWithCommas(followers.total)} Spotify Followers </h4>
 
      <h4>
          {" "}
          {genres
            .map(genre =>
              genre
                .split(" ")
                .join("-")
                .split("-")
                .map(y => capitalize_firstLetter(y))
                .join(" ")
            )
            .join(", ")}
      </h4>{" "}
     
  
      <a href={uri}>
        {images[0] ? <img
          className="artist__profile__img"
          src={images[0] && images[0].url} // change this depending on screen size. 
          alt="artist-profile"
        /> :  <i className="fab fa-spotify"> View Artist Profile </i>}
      </a>
    </div>
  );
};

export default Artist;
