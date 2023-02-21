import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieIDForModal, setModalHandler } from "../../data/data";
import { moviesApi } from "../../api";
import styled from "styled-components";
import DetailVideo from "./DetailVideo";
import MainVideo from "../main/MainVideo";
import ShortInfo from "./ShortInfo";
import useDetailData from "./useDetailData";
import tvData from "../../data/tvData";
import { Recommend } from "@mui/icons-material";
import RecommendMovie from "./RecommendMovie";
import { BiChevronDownCircle } from "react-icons/bi";
import PreviewVideo from "./PreviewVideo";
import Information from "./Information";
import EpisodeBtn from "./EpisodeBtn";

const DetailPageModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  .modal-box-wrapper {
    overflow: scroll;
    font-size: 30px;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    overflow-x: hidden;
    padding-top: 80px;
    box-sizing: border-box;
  }
`;

const ModalBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 940px;
  height: max-content;
  border: none;
  /* padding: 10px; */
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.9) 0px 5px 40px;
  background-color: #181818;
  animation: smoothAppear 0.5s;
  .overview-padding-wrapper {
    padding: 0 48px;
  }
  .detail-overview-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    /* margin: .8em 0;; */
  }
  .leftBox {
    text-align: left;
    font-size: 14px;
    margin-right: 25px;
    svg {
      height: 1.5em;
      margin-right: 0.5em;
      width: 1.5em;
    }
    .ranking {
      display: flex;
      margin: 0.8em 0;
      /* justify-content: center; */
      align-items: center;
      font-size: 20px;
    }
    .overview-box {
      font-size: 16px;
      line-height: 2em;
    }
  }

  @media (min-width: 1400px) {
    width: 1240px;
  }
  @keyframes smoothAppear {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  .recommend {
    position: relative;
  }
`;
const EpisodeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;

  .contentboxHeader {
    width: 100%;
    /* padding: 20px; */
    /* height: 80px; */
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    box-sizing: border-box;
    p {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
      margin-top: 48px;
    }
    select {
      font-size: 12px;
      font-weight: 500;
    }
  }
  .episode-item:nth-child(1) {
    background-color: #333;
  }
  .episode-item {
    display: grid;
    grid-template-columns: 0.4fr 1.2fr 4fr 0.5fr;
    /* gap: 1rem; */
    padding: 16px;
    border-radius: 0.5rem;
    border-bottom: 1px solid #404040;
    align-items: center;
    /* height: 150px; */
    cursor: pointer;
    .episodeNum {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      /* font-weight: 500; */
    }
    .poster {
      display: block;
      max-width: 100%;
      img {
        display: block;
        max-width: 100%;
        border-radius: 0.5rem;
      }
    }
    span {
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      overflow-wrap: anywhere;
    }
  }
  .overview {
    display: flex;
    flex-direction: column;
    color: #d2d2d2;
    margin: 0;
    /* padding: 0 1em 1em; */
    /* flex: 0 0 70; */
    box-sizing: inherit;
    justify-content: center;
    line-height: 20px;
    flex: 0 0 70%;
    font-size: 1em;
    min-height: 100%;
    .overview-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      /* margin-bottom: 10px; */
      padding: 0.5em 0.5em 0.5em;
    }
    .content {
      font-size: 14px;
      padding: 0 1em 1em;
    }
  }
`;
const RecommendContents = styled.div`
  max-height: ${(props) => (props.moreRecommend ? "max-content" : "45em")};
  overflow: hidden;
  .recommend-title {
    text-align: left;
    /* padding: 1rem; */
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 35px;
  }
  .littleImage {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    cursor: pointer;
  }
`;
const Preview = styled.div`
  position: relative;
  top: -3em;
  width: 100%;
  .preview-video-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 30px;
  }
`;
const ContentTitle = styled.p`
  text-align: left;
  /* padding: 1rem; */
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  margin-top: 35px;
`;
const SectionDivinder = styled.div`
  background-image: linear-gradient(0deg, #181818 0, hsla(0, 0%, 9%, 0.7) 20%, hsla(0, 0%, 9%, 0.4) 30%, transparent 50%);
  top: ${(props) => (props.moreRecommend ? "-3em" : "-6em")};
  /* border: 1px solid white; */
  border-bottom: 2px solid #404040;
  box-shadow: none;
  display: flex;
  height: 6em;
  justify-content: center;
  margin: auto;
  position: relative;
  width: 100%;
  svg {
    position: relative;
    /* font-size: 40px; */
    top: 4em;
    font-size: 4rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    transform: ${(props) => props.moreRecommend && "rotate(180deg)"};
    &:hover {
      color: #b8b8b8;
    }
  }
`;
const MainVideoContainer = styled.div`
  position: relative;
  /* box-sizing: content-box; */
  width: 100%;
  height: 100%;
  overflow: visible;
  display: flex;
  flex-wrap: wrap;
`;
function DetailPage({ isMovie = true }) {
  const navigate = useNavigate();
  // const likedMovies = useSelector((state) => { return state.likedMovie });
  // const [likedMovie, setLikedMoive] = useState(false);
  const isDetail = true;
  const [moreRecommend, setMoreRecommend] = useState(false);
  const [episode, setEpisode] = useState([]);
  const [season, setSeason] = useState(1);
  let { id } = useParams();

  useEffect(() => {
    document.body.style = `overflow:hidden`;
    return () => (document.body.style = `overflow-x: hidden`);
  }, []);
  useEffect(() => {
    const found = tvData.find((e) => e.season === season);
    setEpisode(found.episode);
  }, [season]);
  const { movie, cast, keyword, reviews, image, recommendations } = useDetailData(id, isMovie);
  const moreInfo = () => {
    if (moreRecommend === false) {
      setMoreRecommend(true);
    } else {
      setMoreRecommend(false);
    }
  };
  console.log(movie, keyword?.keywords, cast, movie?.videos?.results.length > 0);
  return (
    <>
      <DetailPageModalBackground
        onClick={() => {
          navigate(-1);
        }}
      >
        <div className="modal-box-wrapper">
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <MainVideoContainer>
              <MainVideo isDetail={isDetail} movie={movie} isMovie={isMovie} id={id} />
            </MainVideoContainer>
            <div className="overview-padding-wrapper">
              <div className="detail-overview-container">
                <div className="leftBox">
                  <ShortInfo movieDetail={movie} isMovie={isMovie} />
                  <div className="ranking">
                    <svg viewBox="0 0 28 30" className="svg-icon svg-icon-top-10-badge">
                      <rect x="0" width="28" height="30" rx="3" fill="#e50914"></rect>
                      <path
                        d="M16.8211527,22.1690594 C17.4133103,22.1690594 17.8777709,21.8857503 18.2145345,21.3197261 C18.5512982,20.7531079 18.719977,19.9572291 18.719977,18.9309018 C18.719977,17.9045745 18.5512982,17.1081018 18.2145345,16.5414836 C17.8777709,15.9754594 17.4133103,15.6921503 16.8211527,15.6921503 C16.2289952,15.6921503 15.7645345,15.9754594 15.427177,16.5414836 C15.0904133,17.1081018 14.9223285,17.9045745 14.9223285,18.9309018 C14.9223285,19.9572291 15.0904133,20.7531079 15.427177,21.3197261 C15.7645345,21.8857503 16.2289952,22.1690594 16.8211527,22.1690594 M16.8211527,24.0708533 C15.9872618,24.0708533 15.2579042,23.8605988 14.6324861,23.4406836 C14.0076618,23.0207685 13.5247891,22.4262352 13.1856497,21.6564897 C12.8465103,20.8867442 12.6766436,19.9786109 12.6766436,18.9309018 C12.6766436,17.8921018 12.8465103,16.9857503 13.1856497,16.2118473 C13.5247891,15.4379442 14.0076618,14.8410352 14.6324861,14.4205261 C15.2579042,14.0006109 15.9872618,13.7903564 16.8211527,13.7903564 C17.6544497,13.7903564 18.3844012,14.0006109 19.0098194,14.4205261 C19.6352376,14.8410352 20.1169224,15.4379442 20.4566558,16.2118473 C20.7952012,16.9857503 20.9656618,17.8921018 20.9656618,18.9309018 C20.9656618,19.9786109 20.7952012,20.8867442 20.4566558,21.6564897 C20.1169224,22.4262352 19.6352376,23.0207685 19.0098194,23.4406836 C18.3844012,23.8605988 17.6544497,24.0708533 16.8211527,24.0708533"
                        fill="#FFFFFF"
                      ></path>
                      <polygon
                        fill="#FFFFFF"
                        points="8.86676 23.9094206 8.86676 16.6651418 6.88122061 17.1783055 6.88122061 14.9266812 11.0750267 13.8558085 11.0750267 23.9094206"
                      ></polygon>
                      <path
                        d="M20.0388194,9.42258545 L20.8085648,9.42258545 C21.1886861,9.42258545 21.4642739,9.34834303 21.6353285,9.19926424 C21.806383,9.05077939 21.8919103,8.83993091 21.8919103,8.56731273 C21.8919103,8.30122788 21.806383,8.09572485 21.6353285,7.94961576 C21.4642739,7.80410061 21.1886861,7.73104606 20.8085648,7.73104606 L20.0388194,7.73104606 L20.0388194,9.42258545 Z M18.2332436,12.8341733 L18.2332436,6.22006424 L21.0936558,6.22006424 C21.6323588,6.22006424 22.0974133,6.31806424 22.4906012,6.51465818 C22.8831952,6.71125212 23.1872921,6.98684 23.4028921,7.34142182 C23.6178982,7.69659758 23.7259952,8.10522788 23.7259952,8.56731273 C23.7259952,9.04246424 23.6178982,9.45762788 23.4028921,9.8122097 C23.1872921,10.1667915 22.8831952,10.4429733 22.4906012,10.6389733 C22.0974133,10.8355673 21.6323588,10.9335673 21.0936558,10.9335673 L20.0388194,10.9335673 L20.0388194,12.8341733 L18.2332436,12.8341733 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        d="M14.0706788,11.3992752 C14.3937818,11.3992752 14.6770909,11.322063 14.9212,11.1664509 C15.1653091,11.0114327 15.3553697,10.792863 15.4913818,10.5107418 C15.6279879,10.2286206 15.695697,9.90136 15.695697,9.52717818 C15.695697,9.1535903 15.6279879,8.82573576 15.4913818,8.54361455 C15.3553697,8.26149333 15.1653091,8.04351758 14.9212,7.88790545 C14.6770909,7.73288727 14.3937818,7.65508121 14.0706788,7.65508121 C13.7475758,7.65508121 13.4642667,7.73288727 13.2201576,7.88790545 C12.9760485,8.04351758 12.7859879,8.26149333 12.6499758,8.54361455 C12.5139636,8.82573576 12.4456606,9.1535903 12.4456606,9.52717818 C12.4456606,9.90136 12.5139636,10.2286206 12.6499758,10.5107418 C12.7859879,10.792863 12.9760485,11.0114327 13.2201576,11.1664509 C13.4642667,11.322063 13.7475758,11.3992752 14.0706788,11.3992752 M14.0706788,12.9957842 C13.5634545,12.9957842 13.0995879,12.9090691 12.6784848,12.7344509 C12.2573818,12.5604267 11.8915152,12.3163176 11.5808848,12.0027176 C11.2708485,11.6891176 11.0314909,11.322063 10.8634061,10.9003661 C10.6953212,10.479263 10.6115758,10.0213358 10.6115758,9.52717818 C10.6115758,9.03302061 10.6953212,8.57568727 10.8634061,8.1539903 C11.0314909,7.73288727 11.2708485,7.36523879 11.5808848,7.05163879 C11.8915152,6.73803879 12.2573818,6.49452364 12.6784848,6.31990545 C13.0995879,6.14588121 13.5634545,6.05857212 14.0706788,6.05857212 C14.577903,6.05857212 15.0417697,6.14588121 15.4628727,6.31990545 C15.8839758,6.49452364 16.2498424,6.73803879 16.5604727,7.05163879 C16.871103,7.36523879 17.1098667,7.73288727 17.2779515,8.1539903 C17.4460364,8.57568727 17.5297818,9.03302061 17.5297818,9.52717818 C17.5297818,10.0213358 17.4460364,10.479263 17.2779515,10.9003661 C17.1098667,11.322063 16.871103,11.6891176 16.5604727,12.0027176 C16.2498424,12.3163176 15.8839758,12.5604267 15.4628727,12.7344509 C15.0417697,12.9090691 14.577903,12.9957842 14.0706788,12.9957842"
                        fill="#FFFFFF"
                      ></path>
                      <polygon
                        fill="#FFFFFF"
                        points="8.4639503 12.8342327 6.65837455 13.2666206 6.65837455 7.77862061 4.65323515 7.77862061 4.65323515 6.22012364 10.4690897 6.22012364 10.4690897 7.77862061 8.4639503 7.77862061"
                      ></polygon>
                    </svg>
                    <h4 className="recommend-message">인기상승 1위</h4>
                  </div>
                  <div className="overview-box">{movie?.overview}</div>
                </div>
                <Information cast={cast} movie={movie} keyword={isMovie ? keyword?.keywords : keyword?.results} />
              </div>
              <EpisodeBox>
                <div className="contentboxHeader">
                  <div>
                    <p>회차</p>
                  </div>
                  <EpisodeBtn tvData={tvData} setSeason={setSeason} season={season} />
                  {/* <div>
                    <select>
                      <option>시즌1</option>
                      <option>시즌2</option>
                      <option>시즌3</option>
                    </select>
                  </div> */}
                </div>
                {/* TV에피소드 or Movie로 나뉠것
                                TV의 경우 에피소드 후 추천목록
                                영화의 경우 바로 추천목록 
                                
                                시즌선택 기능 만들어서(더미데이터 만들기) 시즌 1, 2, 3 까지 만들어보기*/}
                {/* map으로 돌릴것 TV의 경우 에피소드 표시
                                        Movie의 경우 없어도 될듯*/}
                <div className="episode-container">
                  {episode?.map((data) => (
                    <div className="episode-item" key={data.id}>
                      <div className="episodeNum">{data.episode_num}</div>
                      <div className="poster">
                        <img src={data.img} alt="" />
                      </div>
                      <div className="overview">
                        <div className="overview-title">
                          <span>{data.title}</span>
                          <span>{data.running_time} 분</span>
                        </div>
                        <p className="content">{data.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="contents">
                  <div className="episodeNum"></div>
                  <div className="poster"></div>
                  <div className="overview">
                    <h1></h1>
                    <p className="content"></p>
                  </div>
                </div>
              </EpisodeBox>
              <div className="recommend">
                <RecommendContents moreRecommend={moreRecommend}>
                  <div className="recommend-title">
                    <p>함께 시청된 콘텐츠</p>
                  </div>
                  <div className="littleImage">
                    {recommendations?.map((rec) => {
                      return <RecommendMovie isMovie={isMovie} recommendations={rec} />;
                    })}
                  </div>
                  {/* 컴포넌트화 할것
                                        이거 처음에 모달(아직안만듬)이랑 거의 같은 구성 */}
                </RecommendContents>
                <SectionDivinder moreRecommend={moreRecommend}>
                  <BiChevronDownCircle onClick={moreInfo} />
                </SectionDivinder>
              </div>
              <Preview>
                {movie?.videos?.results.length > 0 && <ContentTitle>예고편 및 다른 영상</ContentTitle>}
                <div className="preview-video-wrapper">
                  {movie?.videos?.results.map((video, i) => {
                    if (i < 4) {
                      return <PreviewVideo video={video} />;
                    } else {
                      return null;
                    }
                  })}
                </div>
              </Preview>
              <div className="footerInfo">
                {/* 감독,출연,각본등 영화 상세정보 표시 */}
                <ContentTitle>{isMovie ? movie?.title : movie?.name} 상세 정보</ContentTitle>
                <Information footer={true} cast={cast} movie={movie} keyword={isMovie ? keyword?.keywords : keyword?.results} />
              </div>
              <Link to="/main">
                <button>close</button>
              </Link>
            </div>
          </ModalBox>
        </div>
      </DetailPageModalBackground>
    </>
  );
}

export default DetailPage;
