import axios from '../axios';
import React, { useEffect, useRef, useState } from 'react'
import "../css/Row.css"
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import useSliding from './useSliding';
import useSizeElement from './useSizeElement';
import RowImage from './main/RowImage';
import "../css/slick.css"
import "../css/slick-theme.css"
import { useSelector } from 'react-redux';
import svgPath from '../data/rankingSvgPath';

function Row({ picked, title, movie, isLargeRow = false, children, isMovie = true, mainVideoPlay }) {
    const [rowHoverd, setRowHoverd] = useState(false);
    const [btnHoverd, setBtnHoverd] = useState(false);
    const [width, setWidth] = useState();
    const [likedMovie, setLikedMoive] = useState();
    const pickedMovie = useSelector((state) => { return state.likedMovie });
    useEffect(()=>{
        const profile = JSON.parse(localStorage.getItem('profile'));
        setLikedMoive(profile.likedMovie)
    },[pickedMovie])
    const base_url = "https://image.tmdb.org/t/p/original/"
    const { handlePrev,
        handleNext,
        slideProps,
        testRef,
        hasNext,
        hasPrev
    } = useSliding(width, picked ? likedMovie?.length : movie?.length);
    return (
        <div className={`main-row ${rowHoverd && 'zindex-test'}`}>
            <h2 className="main-row-title">{title}</h2>
            <div className="row-posters-wrapper"
                onMouseEnter={() => { setRowHoverd(true) }}
                onMouseLeave={() => { setRowHoverd(false) }}>
                {
                    hasPrev && rowHoverd &&
                    <ArrowBackIosOutlinedIcon
                        sx={{ fontSize: 10 }}
                        onMouseEnter={() => { setBtnHoverd(true) }}
                        onMouseLeave={() => { setBtnHoverd(false) }}
                        className={`sliderArrow left ${btnHoverd && 'btn-hoverd'}`} onClick={handlePrev} />
                }
                <div ref={testRef} className="row-posters" {...slideProps} >
                    {
                        !picked ?
                            movie?.map((movie, idx) => (

                                <RowImage
                                    setWidth = {setWidth}
                                    key={idx}
                                    base_url={base_url}
                                    isLargeRow={isLargeRow}
                                    svgPath = {isLargeRow && svgPath[idx]}
                                    movie={movie}
                                    isMovie={isMovie} />
                            ))
                            : likedMovie?.map((movie, idx) => (
                                <RowImage
                                    setWidth = {setWidth}
                                    key={idx}
                                    base_url={base_url}
                                    isLargeRow={isLargeRow}
                                    movie={movie}
                                    isMovie={isMovie}
                                    picked={picked}
                                />
                            ))
                    }      
                </div>
                {
                    hasNext &&
                    <ArrowForwardIosOutlinedIcon sx={{ fontSize: 50 }} className={`sliderArrow right ${!rowHoverd && "hide "}`} onClick={handleNext} />
                }
            </div>
        </div>
    )

}

export default Row