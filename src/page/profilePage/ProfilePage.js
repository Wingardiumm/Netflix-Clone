import React, { useEffect } from "react";
import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setProfileData } from "../../data/data";
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
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: inline-block;
    position: relative;
    vertical-align: top;
  }
`;
const ListProfiles = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
  max-width: 80%;
  .profle-gate-label {
    color: #fff;
    font-size: 3.5vw;
    font-weight: unset;
    width: 100%;
  }
`;
const ChooseProfle = styled.ul`
  margin: 2em 0;
  box-sizing: border-box;
  .profile {
    :hover {
      .avatar-wrapper {
        background-color: #e5e5e5;
        ::after {
          border: 0.2em solid white;
        }
      }
      .bs-plus-circle{
        background-color: #e5e5e5;
      }
      span {
        color: white;
      }
    }
  }
  .avatar-wrapper {
    position: relative;
    ::after {
      border: 0.3em solid transparent;
      border-radius: 4px;
      bottom: 0;
      content: "";
      display: block;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
    /* :hover {
      ::after{
        border: 0.2em solid white;
      }
    } */
  }
  .profile {
    max-width: 200px;
    min-width: 84px;
    width: 10vw;
    .bs-plus-circle{
    background-color: #141414;
    color: grey;
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    height: 10vw;
    max-height: 200px;
    max-width: 200px;
    min-height: 84px;
    min-width: 84px;
    position: relative;
    text-decoration: none;
    width: 5vw;
    }
  }
  img {
    background-color: #333;
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    height: 10vw;
    max-height: 200px;
    max-width: 200px;
    min-height: 84px;
    min-width: 84px;
    position: relative;
    text-decoration: none;
    width: 10vw;
  }
  
  .profile:not(:last-child) {
    margin: 0 2vw 0 0;
  }
`;
const ProfileName = styled.span`
  color: grey;
  display: block;
  font-size: 1.3vw;
  /* line-height: 1.2em; */
  margin: 0.6em 0;
  min-height: 1.8em;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  line-height: 1.5;
`;
const ProfileBtn = styled.span`
  a {
    background-color: transparent;
    border: 1px solid grey;
    color: grey;
    cursor: pointer;
    display: block;
    font-size: 1.2vw;
    letter-spacing: 2px;
    margin: 2em 0 1em;
    padding: 0.5em 1.5em;
  }
  :hover {
    a {
      border: 1px solid white;
      color: white;
    }
  }
`;

function ProfilePage() {
  const profileData = useSelector((state)=> { return state.profileData.profiles });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    const id = localStorage.getItem("authenticated");
    const foundData = data.find((e) => e.id === id);
    dispatch(setProfileData(foundData));
    console.log(profileData?.id, foundData)
  },[]);

  const profileLogin = (profile,e)=>{
    e.preventDefault();
    console.log(profile)
    let pr = JSON.stringify(profile)
    localStorage.setItem('profile', pr)
    navigate('/main');
  }
  return (
    <Background>
      <ListProfiles>
        <h1 className="profle-gate-label">넷플릭스를 시청할 프로필을 선택하세요.</h1>
        <ChooseProfle>
          {profileData?.map((profile,i) => (
            <li className="profile" >
              <Link onClick={e=>{
                profileLogin(profile,e)
              }}>
                <div className="avatar-wrapper">
                  <img
                    src={`${profile?.profilePath}`}
                    alt=""
                  />
                </div>
                <ProfileName>{profile?.profileTitle}</ProfileName>
              </Link>
            </li>
          ))}
          <li className="profile">
            <Link>
              <div className="avatar-wrapper">
                <BsPlusCircleFill className="bs-plus-circle"></BsPlusCircleFill>
              </div>
              <ProfileName>프로필 추가</ProfileName>
            </Link>
          </li>
        </ChooseProfle>
      </ListProfiles>
      <ProfileBtn>
        <Link to={'/profile'}>프로필 관리</Link>
      </ProfileBtn>
    </Background>
  );
}

export default ProfilePage;
