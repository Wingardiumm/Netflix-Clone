import React from 'react'
import styled from 'styled-components'

const ShortInfoContainer = styled.div`
    font-size: 2rem;
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
        align-items: center;
        position: relative;
        .adult-rating{
            position: relative;
            top: 4px;
        }
        img{
            width:2rem;
            }
        .resolution-type{
                border: 1px solid white;
                font-size: 1rem;
                height: 1.4rem;
                width: 1.7rem;
            }
`

function ShortInfo({movieDetail,isMovie}) {
    return (
        <>
            <ShortInfoContainer>
                <div className="star-rating">
                    ⭐{movieDetail?.vote_average}
                </div>
                <div className="adult-rating">
                    <img src="../../media/15.png" />
                </div>
                <div className="runtime">
                    {
                    // movieDetail.episode_run_time[0]?.[0]
                    isMovie ? <> {movieDetail?.runtime} 분</> 
                    : movieDetail?.number_of_seasons>1 ? 
                    <>시즌 {movieDetail?.number_of_seasons} 개</> :
                     <>에피소드 {movieDetail?.number_of_episodes} 개</>
                    } 
                    
                </div>
                <div className="resolution-type">
                    HD
                </div>
            </ShortInfoContainer>
        </>
    )
}

export default ShortInfo