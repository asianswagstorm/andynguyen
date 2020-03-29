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
    <div>
      {/* Change this to a table row */}
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
      <br />
      <p>
        <h4>{numberWithCommas(followers.total)} Spotify Followers </h4>
      </p>
      <br />
      <p>
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
      </p>
      <br />
      <a href={uri}>
        <img
          src={images[0] && images[0].url} // same image different heights
          alt="artist-profile"
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            objectFit: "cover"
          }}
        />
      </a>
    </div>
  );
};

export default Artist;
