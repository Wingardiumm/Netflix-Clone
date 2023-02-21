import React from 'react'
import '../css/Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    return (
        <footer className="main-footer">
            <div className="main-footer-wraper">
                <div className="footer-site-link">
                    <FacebookIcon  className="footer-site-icon"></FacebookIcon>
                    <InstagramIcon className="footer-site-icon"></InstagramIcon>
                    <TwitterIcon  className="footer-site-icon"></TwitterIcon>
                    <YouTubeIcon  className="footer-site-icon"></YouTubeIcon>
                </div>
                <div className="footer-service-link">
                    <ul>
                        <li><a href="#">화면 해설</a></li>
                        <li><a href="#">고객 센터</a></li>
                        <li><a href="#">기프트카드</a></li>
                        <li><a href="#">미디어 센터</a></li>
                        <li><a href="#">투자 정보(IR)</a></li>
                        <li><a href="#">입사 정보</a></li>
                        <li><a href="#">이용 약관</a></li>
                        <li><a href="#">개인정보</a></li>
                        <li><a href="#">법적 고지</a></li>
                        <li><a href="#">쿠키 설정</a></li>
                        <li><a href="#">회사 정보</a></li>
                        <li><a href="#">문의하기</a></li>
                    </ul>
                </div>
                <div className="footer-service-code"><a href="#">서비스 코드</a></div>
                <div className="footer-address">
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
                    <a href="#">공정거래위원회 웹사이트</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer