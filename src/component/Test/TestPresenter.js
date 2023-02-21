import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { homeApi } from '../../api'

function TestPresenter({ movieDetail, error, loading }) {
    // console.log(movieDetail)
    const [movie, setMovie] = useState([]);
    useEffect(()=>{
        async function test() {
            const request = await homeApi.nowPlaying();
            setMovie(request.data.results);
            return request;
        }
        test();
    },[])
    console.log(movie)

  return (
    <div>
        dpwqokdpowqk
        {/* {movieDetail.title}
        <img src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}/> */}
    </div>
  )
}

export default TestPresenter