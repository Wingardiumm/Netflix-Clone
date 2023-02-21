import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/ProfileModal.css";
import { RiPencilFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const StyledLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ProfileModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  border: 1px solid hsla(0, 0%, 100%, 0.15);
  box-sizing: border-box;
  color: #fff;
  cursor: default;
  font-size: 13px;
  line-height: 20px;
  opacity: 1;
  position: absolute;
  top: 50px;
  width: 220px;
  right: 0px;
  .span-cover {
    position: absolute;
    right: 10px;
    top: -36px;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column-reverse;
    z-index: 0;
    cursor: pointer;
  }
  .profile-span {
    margin-left: 10px;
    font-size: 15px;
    transition: all 0.5s;
    border-color: #fff transparent transparent;
    border-style: solid;
    border-width: 7px 7px 0;
    height: 0;
    transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
    width: 0;
    position: absolute;
    bottom: 5px;
  }
  ul {
    list-style: none;
    /* margin: 0; */
    padding: 10px;
    text-align: left;
  }
  li {
    line-height: 40px;
    width: 100%;
  }
  svg {
    margin-right: 10px;
  }
  .profile-option-links,
  .logout-section {
    border-top: 1px solid hsla(0, 0%, 100%, 0.25);
  }
  .profile-option-link {
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }
  .logout-link-box {
    text-align: center;
    padding: 10px;
  }
  .profile-select-section {
    width: 100%;
  }
  .profile-img-container {
    display: flex;
    align-items: center;
    line-height: 40px;
    img {
      border-radius: 0.5rem;
      margin-right: 10px;
    }
  }
  .profileModal-section-divider {
    border: 1px solid #222;
  }
`;

function ProfileModal() {
  const [profiles, setProfiles] =useState();
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("user"));
    const pr = JSON.parse(localStorage.getItem('profile'));
    const id = localStorage.getItem("authenticated");
    const foundData = data.find((e) => e.id === id);
    const prs = foundData.profiles?.filter((e)=>e.profileId !== pr.profileId);
    setProfiles(prs);
    console.log(data)
  },[])
  const changeProfile = (profile,e)=>{
    e.preventDefault();
    console.log(profile)
    let pr = JSON.stringify(profile)
    localStorage.setItem('profile', pr)
    window.location.replace("/main")
  }
  const logout = () => {
    localStorage.removeItem("authenticated");
  };
  console.log(profiles)
  return (
    <ProfileModalWrapper>
      <div className="span-cover">
        <span className="profile-span" style={{ transform: "rotate(180deg)" }}></span>
      </div>
      <div className="profile-select-section">
        <ul className="profile-select-img">
          {profiles?.map((profile) => (
            <li>
              <Link onClick={(e)=>{changeProfile(profile,e)}}>
                <div className="profile-img-container">
                  <img
                    src={profile.profilePath}
                    alt=""
                  />
                  <StyledLink>{profile.profileTitle}</StyledLink>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="profile-option-section">
        <ul className="profile-option-links">
          <li className="profile-option-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z"
                fill="currentColor"
              ></path>
            </svg>
            <StyledLink to={'/profile'} className="profile-link">프로필 관리</StyledLink>
          </li>
          <li className="profile-option-link">
            <svg id="profile-transfer" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 1C3.79086 1 2 2.79086 2 5V17C2 19.2091 3.79086 21 6 21H9.58579L8.29289 22.2929L9.70711 23.7071L12.7071 20.7071C13.0976 20.3166 13.0976 19.6834 12.7071 19.2929L9.70711 16.2929L8.29289 17.7071L9.58579 19H6C4.89543 19 4 18.1046 4 17V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V17C20 18.1046 19.1046 19 18 19H15V21H18C20.2091 21 22 19.2091 22 17V5C22 2.79086 20.2091 1 18 1H6ZM7.5 10C8.32843 10 9 9.32843 9 8.5C9 7.67157 8.32843 7 7.5 7C6.67157 7 6 7.67157 6 8.5C6 9.32843 6.67157 10 7.5 10ZM18 8.5C18 9.32843 17.3284 10 16.5 10C15.6716 10 15 9.32843 15 8.5C15 7.67157 15.6716 7 16.5 7C17.3284 7 18 7.67157 18 8.5ZM16.402 12.1985C15.7973 12.6498 14.7579 13 13.5 13C12.2421 13 11.2027 12.6498 10.598 12.1985L9.40195 13.8015C10.4298 14.5684 11.9192 15 13.5 15C15.0808 15 16.5702 14.5684 17.598 13.8015L16.402 12.1985Z"
                fill="currentColor"
              ></path>
            </svg>
            <StyledLink>프로필 이전</StyledLink>
          </li>
          <li className="profile-option-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.00011 8C9.00011 6.34315 10.3433 5 12.0001 5C13.657 5 15.0001 6.34315 15.0001 8C15.0001 9.65685 13.657 11 12.0001 11C10.3433 11 9.00011 9.65685 9.00011 8ZM12.0001 3C9.23869 3 7.00011 5.23858 7.00011 8C7.00011 10.7614 9.23869 13 12.0001 13C14.7615 13 17.0001 10.7614 17.0001 8C17.0001 5.23858 14.7615 3 12.0001 3ZM5.98069 21.1961C6.46867 18.7563 8.61095 17 11.0991 17H12.9011C15.3893 17 17.5316 18.7563 18.0195 21.1961L19.9807 20.8039C19.3057 17.4292 16.3426 15 12.9011 15H11.0991C7.65759 15 4.69447 17.4292 4.01953 20.8039L5.98069 21.1961Z"
                fill="currentColor"
              ></path>
            </svg>
            <StyledLink>계정</StyledLink>
          </li>
          <li className="profile-option-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 8.5C10.6831 8.5 10 9.24303 10 10H8C8 7.75697 10.0032 6.5 12 6.5C13.9968 6.5 16 7.75697 16 10C16 11.3487 14.9191 12.2679 13.8217 12.68C13.5572 12.7793 13.3322 12.9295 13.1858 13.0913C13.0452 13.2467 13 13.383 13 13.5V14H11V13.5C11 12.0649 12.1677 11.1647 13.1186 10.8076C13.8476 10.5339 14 10.1482 14 10C14 9.24303 13.3169 8.5 12 8.5ZM13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z"
                fill="currentColor"
              ></path>
            </svg>
            <StyledLink>고객 센터</StyledLink>
          </li>
        </ul>
      </div>
      <div className="logout-section">
        <div className="logout-link-box">
          <StyledLink to={"/loginPage"} onClick={logout}>
            넷플릭스에서 로그아웃
          </StyledLink>
        </div>
      </div>
    </ProfileModalWrapper>
  );
}

export default ProfileModal;
