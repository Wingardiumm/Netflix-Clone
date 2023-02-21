import React from "react";
import styled from "styled-components";

const IframeContainer = styled.div`
    width: 100%;
`
const IframeDesc = styled.h2`
  margin-top: 12px;
  font-size: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 19px;
  }
`;
function PreviewVideo({ video }) {
    console.log()
  return (
    <>
      <IframeContainer>
        <iframe
          src={`https://www.youtube.com/embed/${video?.key}?playlist=${video?.key}`}
          width="400"
          height="280"
          frameborder="0"
          allow="autoplay; fullscreen"
          style={{borderRadius:'1rem'}}
        ></iframe>
        <IframeDesc>{video.name.slice(0,25)}</IframeDesc>
      </IframeContainer>
    </>
  );
}

export default PreviewVideo;
