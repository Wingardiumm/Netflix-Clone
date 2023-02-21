import React from 'react'
import SectionDivider from '../../component/SectionDivider'
import Faq from './Faq'
import tvPath from '../../media/tv.png'
import tvAnimationPath from '../../media/tv_animation.m4v'
import mobilePath from '../../media/mobile.jpg'
import boxShotPath from '../../media/boxshot.png'
import downloadIconPath from '../../media/download-icon.gif'
import styled from "styled-components";


// const StoryCardsContainer = styled.div`
//     margin: 0 auto;
// `

const TvVideoContainer = styled.div`
    width: 30rem;
    height: 23.4rem;
    position: relative;
    @media (min-width: 768px) {
        width: 50rem;
	    height: 38rem;
    }
`

const TvImage = styled.img`
    position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 5;
`

const TvVideo = styled.video`
    position: absolute;
	top: 0.8rem;
	left: 4rem;
	width: 22.1rem;
	height: 21rem;
    @media (min-width: 768px) {
        top: 3.5rem;
		left: 6.6rem;
		width: 37rem;
		height: 29.5rem;
    }
`

const DownloadContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0% 0% 0% -10%;
`
const DownloadContainerImg = styled.img`
    width: 100%;
    height: 100%;
`
const DownloadContainerPoster = styled.img`
    width: 100%;
    height: 100%;
`
const DownloadVideoContainer = styled.div`
    display: grid;
    grid-template-columns: 5rem 1fr 5rem;
    width: 60%;
    height: 10rem;
    padding: 1rem;
    align-items: center;
    border: 2px solid rgba(255,255,255,0.25);
    border-radius: 1rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 7%;
    background: black;
`
const TextContainer = styled.div`
    text-align: left;
    padding-left: 2rem;
`
const TextContainerTitle = styled.p`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`
const TextContainerDownloading = styled.p`
    font-size: 1.2rem;
    color: #0071eb;
`


const StoryCardImg = styled.div`
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    height: 100%;
    width: 48%;
    margin: ${(props) => props.animation && "-2% 0 0 -5%"};
	/* place-items: center; */
    
`

const StoryCardH1 = styled.h1`
    font-size: 3rem;
    word-break: keep-all;
    @media (min-width: 768px) {
        font-size: 5rem;
        margin-bottom: 2rem;
    }
`
const StoryCardH2 = styled.h2`
    font-size: 1.8rem;
    font-weight: 600;
    word-break: keep-all;
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    /* font-weight: bold; */
    @media (min-width: 768px) {
        font-size: 2.2rem;
    }
`

const StoryCardContainer = styled.div`
    padding: 5rem 5%;
	display: grid;
	grid-row-gap: 1rem;
	max-width: 1400px;
	margin: 0 auto;
    width: 100%;
    .story-card-box{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        width: 100%;
        max-width: 1100px;
    }
    @media (min-width: 900px) {
    /* grid-template-columns: 1fr 1fr; */
	align-items: center;
    }

`;

const StoryCardText = styled.div`
    position: relative;
	text-align: left;
    flex: 0 1 auto;
    height: 100%;
    padding: 0 3rem 0 0;
    width: 52%;
    z-index: 3;
    @media (max-width: 768px) {
        text-align: center;
  }
`;

const DescImage = styled.img`
  width: 520px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;
const DescVideoDevice = styled.video`
  position: absolute;
  top: 33%;
  left: 49.5%;
  transform: translate(-50%, -50%);
  width: 320px;
  z-index: 1;

  @media (max-width: 768px) {
    width: 250px;
  }
`;

function StoryCard() {
    const animation = true;
    return (
        <>
                <StoryCardContainer>
                    <div className="story-card-box">
                        <StoryCardText>
                            <StoryCardH1>
                                TV로 즐기세요.
                            </StoryCardH1>
                            <StoryCardH2>
                                스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이 플레이어 등 다양한 디바이스에서 시청하세요.
                            </StoryCardH2>
                        </StoryCardText>
                        <StoryCardImg>
                            <TvVideoContainer>
                                <TvImage src={tvPath} alt=""/>
                                <TvVideo autoPlay muted loop src={tvAnimationPath}></TvVideo>
                            </TvVideoContainer>
                        </StoryCardImg>
                    </div>
                </StoryCardContainer>
                <SectionDivider />
                <StoryCardContainer>
                <div className="story-card-box">
                    <StoryCardImg animation={animation}>
                        <DescImage src="media/icon_device.png" />
                        <DescVideoDevice src="media/video_device.mp4" autoPlay muted loop />
                        {/* <img className="ic" src="media/icon_device.png" alt="" /> */}
                    </StoryCardImg>
                    <StoryCardText>
                        <StoryCardH1>
                            다양한 디바이스에서
                            <br />
                            시청하세요.
                        </StoryCardH1>
                        <StoryCardH2>각종 영화와 TV 프로그램을 스마트폰, 태블릿, 노트북, TV에서 무제한으로 스트리밍하세요. 추가 요금이 전혀 없습니다.</StoryCardH2>
                    </StoryCardText>
                    </div>
                </StoryCardContainer>
                <SectionDivider />
                <StoryCardContainer>
                <div className="story-card-box">
                    <StoryCardText>
                        <StoryCardH1>어린이 전용 프로필을 만들어 보세요.</StoryCardH1>
                        <StoryCardH2>자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.</StoryCardH2>
                    </StoryCardText>
                    <StoryCardImg>
                        <DescImage src="media/kids.png" alt="" />
                    </StoryCardImg>
                    </div>
                </StoryCardContainer>
                <SectionDivider />
                <StoryCardContainer>
                <div className="story-card-box">
                    <StoryCardImg animation={animation}>
                        <DownloadContainer>
                            <DownloadContainerImg src={mobilePath} alt="" />
                            <DownloadVideoContainer>
                                <DownloadContainerPoster src={boxShotPath} alt="" />
                                <TextContainer>
                                    <TextContainerTitle>
                                        기묘한 이야기
                                    </TextContainerTitle>
                                    <TextContainerDownloading>
                                        저장 중...
                                    </TextContainerDownloading>
                                </TextContainer>
                                <DownloadContainerPoster src={downloadIconPath} alt="" />
                            </DownloadVideoContainer>
                        </DownloadContainer>
                    </StoryCardImg>
                    <StoryCardText>
                        <StoryCardH1>즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요.</StoryCardH1>
                        <StoryCardH2>각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로 스트리밍하세요. 추가 요금이 전혀 없습니다.</StoryCardH2>
                    </StoryCardText>
                    </div>
                </StoryCardContainer>
                <SectionDivider />
                <Faq />
        </>
    )
}

export default StoryCard