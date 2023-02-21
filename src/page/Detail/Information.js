import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const InformationBox = styled.div`
  font-size: 14px;
  text-align: left;
  .cast,
  .genre,
  .feature {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    margin: 0.5em 0.5em 0.5em 0;
    word-break: break-word;
    .cast-name
    ,.keyword-name
    ,.genre-name{
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;

function Information({ footer=false ,cast, movie, keyword }) {
    console.log(keyword)
  return (
    <>
      <InformationBox>
        {
            footer && <div className="cast">
                <span style={{ color: "#777777" }}>감독: </span>
                <span className="cast-name">{cast?.crew[0].name}</span>
                </div>
        }
        <div className="cast">
          <span style={{ color: "#777777" }}>출연: </span>
          {cast?.cast.map((cast, idx) => {
            if(!footer){
                if (idx <= 3) {
                  return (
                    <span className="cast-name" key={cast.name}>
                      <Link>{cast.name},</Link>
                    </span>
                  );
                } else if (idx == 4) {
                  return (
                    <span className="cast-name" key={cast.name}>
                      {" "}
                      더보기
                    </span>
                  );
                }
            } else{
                if (idx <= 10) {
                    return (
                      <span className="cast-name" key={cast.name}>
                        <Link>{cast.name},</Link>
                      </span>
                    );
                  } else if (idx == 11) {
                    return (
                      <span className="cast-name" key={cast.name}>
                        {cast.name}
                      </span>
                    );
                  }
            }
          })}
        </div>
        <div className="genre">
          <span style={{ color: "#777777" }}>장르 :</span>
          {movie?.genres.map((genre, i) => {
            if (i + 1 < movie?.genres.length) {
              return (
                <span className="genre-name" key={genre.name}>
                  {genre.name},{" "}
                </span>
              );
            } else {
              return (
                <span className="genre-name" key={genre.name}>
                  {genre.name}
                </span>
              );
            }
          })}
        </div>
        <div className="feature">
          <span style={{ color: "#777777" }}>시리즈 특징: </span>
          {keyword?.map((keyword, idx) => {
            if (idx <= 3) {
              return (
                <span className="keyword-name" key={keyword.name}>
                  <Link>{keyword.name}, </Link>
                </span>
              );
            } else if (idx == 4) {
              return (
                <span className="keyword-name" key={keyword.name}>
                 {keyword.name}
                </span>
              );
            } else {
              return null;
            }
          })}
        </div>
      </InformationBox>
    </>
  );
}

export default Information;
