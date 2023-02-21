import '../css/index.css';
import '../css/global.css'
import '../css/select.css'
import Header from './Header';
import BannerSection from '../component/BannerSection';
import SectionDivider from '../component/SectionDivider';
import StoryCard from './landingPage/StoryCard';
import { Link, Navigate } from 'react-router-dom';

function LandingPage() {
    const isLoggedIn = localStorage.getItem("authenticated") === null ? false : true;
    if(isLoggedIn){
        return(<Navigate to='/main'/>)
    }
    return (
        <div className="LandingPage">
            <Header></Header>
            <BannerSection/>
            <SectionDivider/>
                <StoryCard/>
            <SectionDivider/>
            <div className="footer">
                <Link className="footer-link contact-link">질문이 있으신가요? 문의 전화: 080-001-9587</Link>
                <div className="footer-link-container">
                    <Link className="footer-link">자주 묻는 질문</Link>
                    <Link className="footer-link">고객 센터</Link>
                    <Link className="footer-link">계정</Link>
                    <Link className="footer-link">미디어 센터</Link>
                    <Link className="footer-link">투자 정보(IR)</Link>
                    <Link className="footer-link">입사 정보</Link>
                    <Link className="footer-link">넷플릭스 지원 디바이스</Link>
                    <Link className="footer-link">이용 약관</Link>
                    <Link className="footer-link">개인정보 처리방침</Link>
                    <Link className="footer-link">쿠키 설정</Link>
                    <Link className="footer-link">회사 정보</Link>
                    <Link className="footer-link">문의하기</Link>
                    <Link className="footer-link">속도 테스트</Link>
                    <Link className="footer-link">법적 고지</Link>
                    <Link className="footer-link">오직 넷플릭스에서</Link>
                </div>
                <div className="select-language">
                    <select name="" id="" className="language-picker">
                        <option value="kr">한국어</option>
                        <option value="en">영어</option>
                    </select>
                </div>
                <div className="footer-lorem">
                    넷플릭스 대한민국
                    <br />
                    <br />
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
                    공정거래위원회 웹사이트
                </div>
            </div>
        </div>

    );
}

export default LandingPage;