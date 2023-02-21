import '../css/loginPage.css'
// import '../css/index.css'
import '../css/global.css'
import logoPath from '../media/netflix.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useValidateEmail from '../Hook/validateEmail'
import { useEffect, useState } from 'react'
import user from '../data/user'

function LoginPage() {
    const isLoggedIn = localStorage.getItem("authenticated") === null ? false : true;
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [test, setTest] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user')){
            localStorage.setItem('user',JSON.stringify(user))
        }
        console.log(JSON.parse(localStorage.getItem('user')))
    },[])

    const eventHandlerType = (e)=>{
        setTest(e);
    }
    const emailInputCheck = (e)=>{
        setEmailInput(e.target.value)
    }
    const passwordInputCheck = (e)=>{
        setPasswordInput(e.target.value)
    }
    const validateCheck = () =>{
        let idAndPwd = JSON.parse(localStorage.getItem('user'));
        let found = idAndPwd.find(e=> e.id === emailInput);
        if(found?.password === passwordInput){
            console.log('로그인 성공')
            localStorage.setItem('authenticated', emailInput)
            navigate('/profile');
        } else{
            alert('아이디 혹은 비밀번호을 올바르게 입력하세요.')
            console.log(found?.password,idAndPwd,passwordInput);
        }
    }
    const { errorMessage } = useValidateEmail(test);
    if(isLoggedIn){
        return(<Navigate to='/main'/>)
    }
    return (
        <div className="LoginPage">
            <div className="header">
                <Link to={'/'} className="header-logo">
                    <img src={logoPath} />
                </Link>
            </div>
            <div className="login-wrapper">
                <div className="login-box-container">
                    <div className="login-box">
                        <h1>
                            로그인
                        </h1>
                        <form>
                            <div className="login-box-input">
                                <div className="input-id">
                                    <input 
                                        onFocus={eventHandlerType}
                                        onBlur={eventHandlerType}
                                        onChange={emailInputCheck}
                                    type="text" className="login-box-input-email " id="email" defaultValue={''} />
                                    <label htmlFor="email" className="login-box-placeholder email-placeholder">이메일 주소 또는 전화번호</label>
                                </div>
                            </div>
                            <div className="errorMessage">
                                정확한 이메일 주소나 전화번호를 입력하세요.
                            </div>
                            <div className="login-box-input password-focuscheck">
                                <div className="input-password">
                                    <input 
                                    onFocus={eventHandlerType}
                                    onBlur={eventHandlerType}
                                    onChange={passwordInputCheck}
                                    className="login-box-input-password" type="password" id="password" defaultValue={""} />
                                    <label htmlFor="password" className="login-box-placeholder password-placeholder">비밀번호</label>
                                </div>
                            </div>
                            <div className="errorMessage">
                                비밀번호는 4~60자 사이여야 합니다.
                            </div>
                            <div className="login-box-input">
                                <button type='button' className="login-box-button" onClick={validateCheck}>로그인</button>
                            </div>
                        </form>
                        <div className="login-box-supportbox">
                            <div className="remember">
                                <span><input id="rememberCheckbox" type="checkbox" /></span>
                                <span><label htmlFor="rememberCheckbox">로그인 정보 저장</label></span>
                            </div>
                            <div className="need-help"><Link href="#">도움이 필요하신가요?</Link></div>
                        </div>
                        <div className="login-box-signup">
                            <span>Netflix 회원이 아닌가요? </span><Link href="#">지금 가입하세요</Link>
                        </div>
                        <div className="login-box-lorem">
                            이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을 확인합니다. <button>자세히 알아보기.</button>
                        </div>
                    </div>
                </div>

                <div className="login-page-footer-container">
                    <div className="footer-wrapper">
                        <div className="login-page-footer-tel">
                            <p>
                                질문이 있으신가요? 문의 전화: <Link href="#">080-001-9587</Link>
                            </p>
                        </div>
                        <div className="login-page-footer-link">
                            <ul className="footer-links">
                                <li className="footer-item"><Link>자주 묻는 질문</Link></li>
                                <li className="footer-item"><Link>고객 센터</Link></li>
                                <li className="footer-item"><Link>이용 약관</Link></li>
                                <li className="footer-item"><Link>개인정보 처리방침</Link></li>
                                <li className="footer-item"><Link>쿠키 설정</Link></li>
                                <li className="footer-item"><Link>회사 정보</Link></li>
                            </ul>
                        </div>
                        <div className="select-language">
                            <select name="" id="" className="language-picker">
                                <option defaultValue={"kr"}>한국어</option>
                                <option defaultValue={"en"}>영어</option>
                            </select>
                        </div>
                        <div className="login-page-footer-lorem">
                            넷플릭스서비시스코리아 유한회사 통신판매업신고번호: 제2018-서울종로-0426호 전화번호: 080-001-9587
                            <br />
                            대표: 레지널드 숀 톰프슨
                            <br />
                            이메일 주소: korea@netflix.com
                            <br />
                            주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161
                            <br />
                            사업자등록번호: 165-87-00119
                            <br />
                            클라우드 호스팅: Amazon Web Services Inc.
                            <br />
                            <Link>공정거래위원회 웹사이트</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage 