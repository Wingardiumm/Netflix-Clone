import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import breakingbadPath from '../../media/breakingbad2.mp4'
import { IoPlayCircleSharp } from "react-icons/io5"
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri"
import { BsCheck } from "react-icons/bs"
import { AiOutlinePlus } from "react-icons/ai"
import { BiChevronDownCircle } from "react-icons/bi"
import { useQuery } from 'react-query'
import axios from 'axios'
import { homeApi, moviesApi, tvApi } from '../../api'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setModalHandler, setMovieSize, setOverviewOn } from '../../data/data'
import useSizeElement from '../useSizeElement'


const OverviewBox = styled.div`
    width: 100%;
    background-color: #181818;
    padding-right: 10px;
    object-fit: contain;
    position: relative;
    z-index: 100;
    /* &.actived{
        display: block;
        opacity: 1;
    } */
`
const RowPoster = styled.div`
    /* opacity: 0; */
    
`

const PosterBox = styled.div`
    height: 100%;
    margin-right: 10px;
    .img-box{
        height: 100%;
        display: ${(props) => props.isLargeRow && 'grid' };
        grid-template-columns: 1fr 1fr;
        svg{
            position: relative;
            /* left: -30px; */
            width: 8.3vw;
            height: 200px;
            @media screen and (max-width:1500px) {
                width: 9.5vw;
            }
            @media screen and (max-width:1200px) {
                width: 11vw;
            }
            @media screen and (max-width:1000px) {
                width: 15vw;
            }
            @media screen and (max-width:800px) {
                width: 21.5vw;
            }
        }
        img {
            position: relative;
            border-radius: 0.2rem;
            /* width: 100%; */
            width: ${(props) => props.isLargeRow ? '8.3vw' : '16.66667vw' };
            height: ${(props) => props.isLargeRow ? '200px' : '100%' };
            z-index: 10;
            object-fit: ${(props) => props.isLargeRow && 'cover center'};
            
            @media screen and (max-width:1500px) {
                width: ${(props) => props.isLargeRow ? '9.5vw' : '19vw' };
            }
            @media screen and (max-width:1200px) {
                width: ${(props) => props.isLargeRow ? '11vw' : '22vw' };
            }
            @media screen and (max-width:1000px) {
                width: ${(props) => props.isLargeRow ? '15vw' : '30vw' };
            }
            @media screen and (max-width:800px) {
                width: ${(props) => props.isLargeRow ? '21.5vw' : '43vw' };
            }
        }
    }
    .hover{
        height: max-content;
        width: 25vw;
        @media screen and (max-width:800px) {
            width: ${(props) => props.isLargeRow ? '50vw' : '50vw' };
        }
        position: absolute;
        top: -200px;
        left: 0;
        /* display: none; */
        border-radius: 0.3rem;
        box-shadow: rgba(0,0,0,0.75) 0px 3px 10px;
        background-color: #181818;
        transition: 1s ease-in-out;
        /* z-index: 100 !important; */
        ${RowPoster} {
            position: relative;
            height: 100%;
            transition: 1s ease-in-out;
            z-index: 100;
            img {
                width: 100%;
                height: max-content;
                object-fit: cover;
                border-radius: 0.3rem;
                top:0;
                z-index: 4;
            }
            video{
                width: 100%;
                height: max-content;
                object-fit: cover;
                border-radius: 0.3rem;
                top:0;
                z-index: 5;
            }
        }
        ${OverviewBox} {
            padding: 1rem;
            gap: 0.5rem;
            .movie-name{
                margin-bottom: 1rem;
            }
            .icons {
                margin-bottom: 1rem;
                display: flex;
                gap: 0.5rem;
                flex-direction: row;
                justify-content: space-between;
                .controls {
                    display: flex;
                    gap: 1rem;
                }
            }
            svg {
                font-size: 3rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;
                &:hover{
                    color: #b8b8b8;
                }
            }
            .genres {
                ul {
                    display: flex;
                    gap: 1rem;
                    li{
                        padding-right: 0.7rem;
                        &:first-of-type{
                            list-style-type: none;
                        }
                    }
                }
            }
            .short-info{
                font-size: 1.5rem;
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
                align-items: center;
               
                /* justify-content: center; */
                img{
                    width:2rem;
                    top: 3px;
                }
                .resolution-type{
                    border: 1px solid white;
                    font-size: 1rem;
                    height: 1.4rem;
                    width: 1.7rem;
                }
            }
        }
        /* transform: scale(2);
        opacity: 1;
        position: absolute; */
        /* ${OverviewBox} {
            display: block;
        opacity: 1;
        z-index: 999;
        } */
    }
`
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;


function RowImage({svgPath,setWidth, picked, movie, isLargeRow, base_url, isMovie }) {
    const [overviewOn, setOverview] = useState(false);
    const [movieDetail, setmovieDetail] = useState(['']);
    const [areMovie, setAreMovie] = useState(isMovie);
    const { elementRef } = useSizeElement(setWidth);
    const videoRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        if (Object.keys(movie).includes('name')) {
            setAreMovie(false);
        } else {
            setAreMovie(true);
        }
        async function fetchData() {
            if (areMovie) {
                const request = await moviesApi.movieDetail(movie.id).catch(function (error) {
                    console.log('실패');
                    console.log(error);
                    console.log(movie.id);
                });
                setmovieDetail(request.data);
            } else {
                const request = await tvApi.tvDetail(movie.id)
                setmovieDetail(request.data);
            }
        }
        fetchData();
    }, [areMovie])

    const mouseHandle = (e) => {
            if (e.type === 'mouseenter') {
                setOverview(true);
                setTimeout(() => {
                    videoRef.current && videoRef.current.play();
                }, 2000);
            } else if (e.type === 'mouseleave') {
                setOverview(false);
            }
        
    }
    return (
        <PosterBox
            onMouseEnter={mouseHandle}
            onMouseLeave={mouseHandle}
            key={movie.id}
            isLargeRow={isLargeRow}
            overviewOn={overviewOn}>
            <div className="img-box" ref={elementRef}>
                {
                    isLargeRow &&
                    <svg id="rank-1" width="100%" height="90%" viewBox="0 0 70 154"
                        className="svg-icon svg-icon-rank-1 top-10-rank">
                        <path stroke="#595959" strokeLinejoin="square" strokeWidth="4"
                            d={`${svgPath}`}></path>
                    </svg>
                }
                <img
                    className={`${isLargeRow && "row-posterLarge"}`}
                    key={movie.id}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                    alt={movie.name}
                />
            </div>
            <div className={`for-hover-effect ${overviewOn && "poster-actived"}`}>
                {
                    overviewOn &&
                    <div className="hover">
                        <RowPoster>
                            <video
                                ref={videoRef}
                                poster={`${base_url}${isLargeRow ? movie.backdrop_path : movie.backdrop_path
                                    }`}
                                // autoPlay
                                muted
                                src={breakingbadPath}></video>
                        </RowPoster>
                        <OverviewBox>
                            <h3 className="movie-name">{areMovie ? movieDetail?.title : movieDetail?.name}</h3>
                            <div className="icons">
                                <div className="controls">
                                    <IoPlayCircleSharp title="play" />
                                    <RiThumbUpFill title="Like" />
                                    <RiThumbDownFill title="Dislike" />
                                </div>
                                <div className="info">
                                    <Link to={areMovie ? `/main/detail/${movieDetail?.id}` : `/main/tv/${movieDetail?.id}`}
                                    // onClick={() => { console.log(movieDetail) }}
                                    >
                                        <BiChevronDownCircle title="상세정보" />
                                    </Link>
                                </div>
                            </div>
                            <div className="short-info">
                                <div className="star-rating">
                                    ⭐{movieDetail?.vote_average}
                                </div>
                                <div className="adult-rating">
                                    <img src="../../media/15.png" />
                                </div>
                                <div className="runtime">
                                    {
                                        areMovie ? <> {movieDetail?.runtime} 분</>
                                            : movieDetail?.number_of_seasons > 1 ?
                                                <>시즌 {movieDetail?.number_of_seasons} 개</> :
                                                <>에피소드 {movieDetail?.number_of_episodes} 개</>
                                    }
                                </div>
                                <div className="resolution-type">
                                    HD
                                </div>
                            </div>
                            <div className="genres flex">
                                <ul className="flex">
                                    {areMovie &&
                                        movieDetail.genres?.map((genre) => (
                                            <li key={genre.name}>{genre.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </OverviewBox>
                    </div>
                }
            </div>
            {/* <video src={breakingbadPath}></video> */}
        </PosterBox>
    )
}

export default RowImage