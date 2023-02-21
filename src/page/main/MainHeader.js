import React, { useEffect, useState } from "react";
import "../../css/main.css";
import ProfileModal from "../ProfileModal";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import logoPath from "../../media/netflix.svg";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProfileImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    border-radius: 0.5rem;
  }
`;

function MainHeader() {
  const [profile, setProfile] = useState();
  const [scrollSwitch, setScrollSwitch] = useState(false);
  const [profileMouseEnter, setProfileMouseEnter] = useState(false);
  const [headerMenuFlag, setHeaderMenuFlag] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrollSwitch(true);
    }
    if (window.scrollY === 0) {
      setScrollSwitch(false);
    }
  };
  useEffect(()=>{
    setProfile(JSON.parse(localStorage.getItem('profile')));
  },[])
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth > 850) {
        setHeaderMenuFlag(false);
      } else {
        setHeaderMenuFlag(true);
      }
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(localStorage.getItem("user"));
  return (
    <>
      <div className={`mainHeader ${scrollSwitch && "scrolled"}`}>
        <div className="logo">
          <Link to="/">
            <img className="main_page_logo" src={logoPath} />
          </Link>
        </div>
        {headerMenuFlag ? (
          <div className="menu">
            <ul>
              <li className="navigation-tab">
                <a href="#">메뉴 ▽</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="menu">
            <ul>
              <li className="navigation-tab">
                <a href="#">홈</a>
              </li>
              <li className="navigation-tab">
                <a href="#">시리즈</a>
              </li>
              <li className="navigation-tab">
                <a href="#">영화</a>
              </li>
              <li className="navigation-tab">
                <a href="#">NEW 요즘 대세 콘텐츠</a>
              </li>
              <li className="navigation-tab">
                <a href="#">내가 찜한 콘텐츠</a>
              </li>
              <li className="navigation-tab">
                <a href="#">언어별 찾아보기</a>
              </li>
            </ul>
          </div>
        )}

        <div className="navigation">
          <div className="search-icon">
            <SearchIcon style={{ fontSize: "1.5em" }}></SearchIcon>
          </div>
          <div className="message-icon">
            <NotificationsNoneIcon style={{ fontSize: "1.5em" }}></NotificationsNoneIcon>
          </div>
          <div
            onMouseEnter={() => {
              setProfileMouseEnter(true);
            }}
            onMouseLeave={() => {
              setProfileMouseEnter(false);
            }}
            className={`profile-img ${profileMouseEnter && "profileMouseEnterd"}`}
          >
            <ProfileImg>
              <img
                src={profile?.profilePath}
                alt=""
              />
              <span className={`profile-span ${profileMouseEnter && "span-hoverd"}`}></span>
            </ProfileImg>
            {profileMouseEnter && (
              <>
                <ProfileModal></ProfileModal>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainHeader;
