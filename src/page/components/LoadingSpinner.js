import React from 'react'
import styled from 'styled-components'
const Background = styled.div`
    position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
  text-align: center;
`

function LoadingSpinner() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <img src="../../media/Rolling-1s-197px.gif" alt="" />
      {/* <img className='in-spinner' src='https://occ-0-988-1360.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABa3m3-q63uwToDNZjoKsqB1mv261OZPpa8ijie6SZL5jxoVNl9zVOp8PyarpK5K7aE6qEx2H5wdDM00SxGL3kAF3ZcND4uo.png?r=4d9'/> */}
    </Background>
  )
}

export default LoadingSpinner