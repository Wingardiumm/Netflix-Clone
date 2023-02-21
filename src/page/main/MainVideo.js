import React, { useEffect, useState } from 'react'
import '../../css/main.css';
import '../../css/global.css'
import '../../css/slider.css'
import breakingbadPath from '../../media/breakingbad2.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MainHeader from './MainHeader';
import styled from 'styled-components';
import { BsPlusCircleFill,BsFillCheckCircleFill } from "react-icons/bs"
import { RiThumbUpFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { setLikedMovie  } from '../../data/data';


const DetailVideoBox = styled.div`
     position: relative;
    /* box-sizing: content-box; */
    width: 100vw;
    height: 100%;
    text-align: left;
    overflow: visible;
    max-height : 400px;
`

function MainVideo({ isDetail = false,movie,isMovie,id}) {
    const dispatch = useDispatch();
    const [likedMovie, setLikedMoive] = useState();
    const [showSwitch, setShowSwitch] = useState(false);
    const likedMovies = useSelector((state) => { return state.likedMovie });
    const likeBtnHandler = ()=>{
        const profile = JSON.parse(localStorage.getItem('profile'));
        let res = profile.likedMovie?.some(data => data.id === Number(id));
        res ? setLikedMoive(true) : setLikedMoive(false);
    }
    const localLikedMovie = ()=>{
        let profile = JSON.parse(localStorage.getItem('profile'))
        let res = profile.likedMovie.some(data => data.id === Number(id));
        let user = JSON.parse(localStorage.getItem('user'));
        const userID = localStorage.getItem("authenticated");
        const index= user.findIndex((e)=>e.id === userID);
        const profileIndex= user[index].profiles.findIndex((e)=>e.profileId === profile.profileId);
        if(res) {
            let filtered = profile.likedMovie?.filter((data) => data.id !== Number(id));
            profile.likedMovie = filtered;
            user[index].profiles[profileIndex].likedMovie = filtered;
        } else{
            profile.likedMovie.push(movie)
            user[index].profiles[profileIndex].likedMovie?.push(movie);
        }
        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('user', JSON.stringify(user))
    }

    useEffect(() => {
        likeBtnHandler();
    }, [likedMovies.movie?.filter(data => data.id === Number(id))])
    
    return (
        <>
            {
                !isDetail ?
                    <div className="main-video">
                        <div className="main-video-overlay"></div>
                        <video className={`main-video-video ${!showSwitch && "show"}`}
                            onEnded={() => {
                                setShowSwitch(true)
                            }}
                            autoPlay muted poster="public\media\breakingbad.jpg"
                            src={breakingbadPath}
                        >
                        </video>
                        <img className={`main-video-end-img ${showSwitch && "show"}`} src="../media/breakingbad.jpg" />
                        <MainHeader></MainHeader>
                        <div className="main-video-content">
                            <div className="main-video-title">
                                <img src="https://occ-0-988-1360.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABS1kQ3bLw61sI8nNQHftRAKuEw-TfNIAjZ2UnZKfwlSWMuc7JVGnvJiFqvkem_5adGMUswsUoJjL0zyIkyIK2QS7Cah82EJv7CKrzZDkapM.webp?r=c0d"
                                    alt="" />
                            </div>
                            <div className="main-video-explain">
                                만년 평교사 월터 화이트. 폐암 말기 진단을 받자 전업주부 아내와 몸이 불편한 아들 생각에

                                눈앞이 아득해진다. 유일한 재능을 발휘하여 가족에게 '유산'을 남기고 가기로 한다.
                            </div>
                            <div className="main-video-button">
                                <a className="play-button"><PlayArrowIcon style={{ fontSize: '1.5em' }} /><span>재생</span></a>
                                <a className="info-button"><InfoIcon style={{ fontSize: '1.5em' }}></InfoIcon><span>상세정보</span></a>
                            </div>
                        </div>
                        <div className="main-video-control-box">
                            <div className="main-video-sound">
                                <div className="main-video-mute"><VolumeOffIcon style={{ fontSize: '2.5em' }}></VolumeOffIcon></div>
                                {/* <div className="main-video-volume"><i className="fa-solid fa-volume-high fa-2x"></i></div> */}
                            </div>
                            <div className="main-video-rating-box">
                                <div className="main-video-rating">
                                    <img src="./media/18.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="main-video detail-video">
                        <div className="main-video-overlay"></div>
                        <video className={`main-video-video ${!showSwitch && "show"}`}
                            onEnded={() => {
                                setShowSwitch(true)
                            }}
                            autoPlay muted poster="https://occ-0-988-1360.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABfN5Pq2x1EZkX4K1JuVcdEseYDKhywvmt-XfZx-AnWvp0DV4-IKkHkDsbJ_Jdv8bJxuWxPYVCsGMP9wibxViqL3xCZQG9lBgSDFY.webp?r=793"
                            src={breakingbadPath}
                        >
                        </video>
                        <img className={`main-video-end-img ${showSwitch && "show"}`} src="https://occ-0-988-1360.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABfN5Pq2x1EZkX4K1JuVcdEseYDKhywvmt-XfZx-AnWvp0DV4-IKkHkDsbJ_Jdv8bJxuWxPYVCsGMP9wibxViqL3xCZQG9lBgSDFY.webp?r=793" />
                        <div className="detail-video-padding-box">
                            <div className="main-video-content">
                                <div className="main-video-title">
                                    <img src="https://occ-0-988-1360.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABXOIRTkXqQ60Mukxb6oIlhoQOB-ze2_xIMF-yori4o7e1m_DEaFjSpKLdpG6v2-xp1ZQf8ly35ToqtMz2T_eLVA7iJwzJGkhZIKsLndw_lxo2Q4Egv2XC9VqS6ejCUAoOKCgSz8NPC8gAxjm2r-qWX-w4LmQols4_L3F45Vzm87pDZEGVHNG.webp?r=854"
                                        alt="" />
                                </div>
                                <div className="main-video-button">
                                    <a className="play-button"><PlayArrowIcon style={{ fontSize: '1.5em' }} /><span>재생</span></a>
                                    {
                                    likedMovie?
                                    <BsFillCheckCircleFill style={{ fontSize: '1em', marginRight: '12px' }} title="Like" onClick={
                                        ()=>{
                                            localLikedMovie()
                                            dispatch(setLikedMovie(movie))
                                        }
                                    }/>
                                    :
                                    <BsPlusCircleFill style={{ fontSize: '1em', marginRight: '12px' }} onClick={
                                        ()=>{
                                            localLikedMovie()
                                            dispatch(setLikedMovie(movie))
                                        }
                                    }/>
                                    }
                                    <RiThumbUpFill title="Like" />
                                </div>
                            </div>
                            <div className="main-video-control-box">
                                <div className="main-video-sound">
                                    <div className="main-video-mute"><VolumeOffIcon style={{ fontSize: '1em' }}></VolumeOffIcon></div>
                                    {/* <div className="main-video-volume"><i className="fa-solid fa-volume-high fa-2x"></i></div> */}
                                </div>
                            </div>
                        </div>
                    </div>

            }
        </>
    )
}

export default MainVideo