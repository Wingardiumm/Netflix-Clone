import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
        <header className="header">
                <Link href="#" className="header-logo">
                    <img src='../media/netflix.svg' alt="" />
                </Link>
                <div className="header-login">
                    <div className="select-language">
                        <select name="" id="" className="language-picker">
                            <option value="kr">한국어</option>
                            <option value="en">영어</option>
                        </select>
                    </div>
                    <div className="header-login-btn">
                        <Link to={'/loginPage'} className="signin-btn primary-btn">로그인</Link>
                    </div>
                </div>
            </header>
    </>
  )
}

export default Header