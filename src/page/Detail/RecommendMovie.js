import styled from 'styled-components'
import React from 'react'
import { BsPlusCircleFill } from 'react-icons/bs';

const RecommendPoster = styled.div`
width: 100%;
max-width: 1000px;
height: 420px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
.recommend-poster{
  position: relative;
  width: 100%;
  height: 100%;
  /* border-radius: 1rem; */
  overflow: hidden;
  .img-box{
    display: block;
    width: 100%;
    height: 100%;
    img{
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      width: 100%;
      height: 100%;
    }
    }
    .recommend-runningtime{
      position: absolute;
      right: 5%;
      top: 5%;
      white-space: nowrap;
      color: #fff;
      font-size: 16px;
    }
  }
  .recommend-poster::before{
  background-image: linear-gradient(198deg,rgba(0,0,0,.9),hsla(0,0%,9%,.5) 20%,transparent 28%);
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
  .recommend-overview{
    display: block;
    background-color: #2f2f2f;
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    .top-box{
      font-size: 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 16px;
      align-items: center;
      .top-left-box{
        display: flex;
        flex-direction: column;
        width: 25%;
        p{
          color: #46d369;
          white-space: unset;
          font-weight: 500;
          font-size: 16px;
          text-align: left;
        }
        .year-box{
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          img{
            transform: translateY(10%);
            margin-right: 10px;
          }
          .release{
            font-weight: 400;
            font-size: 16px;
          }
        }
      }
    }
    .bottom-box{
      padding: 0 1em 1em;
      text-align: left;
      font-size: 16px;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      max-height: 100px;
    }
  }
`;

function RecommendMovie({recommendations,isMovie}) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  return (
    <>
      <RecommendPoster key={recommendations?.id}>
        <div className="recommend-poster">
          <div className="img-box">
            <img 
              src={`${base_url}${isMovie ? recommendations?.backdrop_path : recommendations?.poster_path}`}
            alt="" />
          </div>
          {/* <img src="" alt="" className="recommend-img" /> */}
          <span className="recommend-runningtime">150 분</span>
        </div>
        <div className="recommend-overview">
          <div className="top-box">
            <div className="top-left-box">
              <div className="star-rating">
                <p>82% 일치</p>
              </div>
              <div className="year-box">
                <div className="age-rating">
                  <img src="../../media/15.png" alt="" style={{ width: '30px', height: '30px' }} />
                </div>
                <div className="release">
                  {isMovie ? recommendations.release_date?.substr(0,4) :recommendations?.first_air_date?.substr(0,4)}
                </div>
              </div>
            </div>
            <div className="top-right-box">
              <div className="plus-button">
                <BsPlusCircleFill style={{ fontSize: '2em' ,color:'#fff'}} />
              </div>
            </div>
          </div>
          <div className="bottom-box">
            <div className="overview-box">
              {recommendations.overview}
            </div>
          </div>
        </div>
      </RecommendPoster>
    </>
  )
}

export default RecommendMovie