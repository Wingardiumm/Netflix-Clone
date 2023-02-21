import React from "react";
import { useState } from "react";
import styled from "styled-components";

const EpisodeSelect = styled.div`
  font-size: 12px;
  font-weight: 500;
`;
const DropdownMenuBtn = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-width: 4em;
  position: relative;
  font-size: 1.5em;
  background-color: rgb(36, 36, 36);
  padding: 0.5em 1em;
  color: white;
  cursor: pointer;
  border: 0.1em solid rgb(77, 77, 77);
  border-radius: 0.2em;
  &::after {
    content: "";
    border-left: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
    border-top: 0.4em solid rgb(255, 255, 255);
    transition: transform 0.2s linear 0s;
    margin-left: 2em;
    transform: ${(props)=> props.menuOn && 'rotate(180deg)'}
  }
`;
const DropdownMenu = styled.ul`
  min-width: 10em;
  position: absolute;
  right: 46px;
  cursor: pointer;
  color: white;
  list-style-type: none;
  border: 0.1em solid rgb(77, 77, 77);
  margin-top: 0.1em;
  font-size: 1.5em;
  z-index: 1;
  background-color: rgb(36, 36, 36);
  white-space: nowrap;
  column-gap: 1.8em;
  /* max-height: max(10em, 685.234px - 2rem); */
  max-height: 400px;
  overflow: auto;
  padding: 1rem 0px;
`;
const Seoson = styled.li`
  min-width: 4em;
  padding: 0.5em 0.8em;
  display: block;
  break-inside: avoid;
  &:hover {
    background-color: rgb(77, 77, 77);
  }
  .episodeSelector-option {
    align-items: center;
    display: flex;
  }
`;
function EpisodeBtn({ tvData, setSeason,season }) {
  const [menuOn, setMenuOn] = useState(false);
  const menuHandling = () => {
    if (menuOn) {
      setMenuOn(false);
    } else {
      setMenuOn(true);
    }
  };
  const seasonHandling= (e,season)=>{
    e.preventDefault();
    setSeason(season)
  }
  return (
    <EpisodeSelect onClick={menuHandling}>
      <div>
        <DropdownMenuBtn menuOn={menuOn}>시즌 {season}</DropdownMenuBtn>
      </div>
      {menuOn && (
        <DropdownMenu>
          {tvData?.map((tv) => (
            <Seoson onClick={e=>{seasonHandling(e,tv.season)}}>
              <div className="episodeSelector-option">
                시즌{tv.season}
                &nbsp;&nbsp;
                <span>
                  {`(`}
                  {tv.episode.length}
                  {`개 에피소드)`}
                </span>
              </div>
            </Seoson>
          ))}
        </DropdownMenu>
      )}
    </EpisodeSelect>
  );
}

export default EpisodeBtn;
