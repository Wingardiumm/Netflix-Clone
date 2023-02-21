import "../../css/main.css";
import "../../css/global.css";
import "../../css/slider.css";
import Row from "../Row";
import Footer from "../Footer";
import { homeApi, moviesApi, tvApi } from "../../api";
import MainVideo from "./MainVideo";
import { Navigate, Outlet } from "react-router-dom";
import useMainData from "./useMainData";
import LoadingSpinner from "../components/LoadingSpinner";

function Main() {
  const isLoggedIn = localStorage.getItem("authenticated") === null ? false : true;
  const { nowPlaying, pastOneYear, comedy, horror, action, documentaries, loadingFlag } = useMainData();
  if (!isLoggedIn) {
    return <Navigate to="/loginPage" />;
  }
  return (
    <>
      <div className="main">
        {loadingFlag ? (
          <LoadingSpinner />
        ) : (
          <>
            <MainVideo />
            <div className="ROW-container">
              <Row title="지금 뜨는 콘텐츠" movie={nowPlaying}></Row>
              <Row title="지난 1년간 공개된 콘텐츠"  isMovie={false} movie={pastOneYear}></Row>
              <Row title="코미디 영화" isLargeRow movie={comedy}></Row>
              <Row title="공포 영화" movie={horror}></Row>
              <Row title="액션 영화" movie={action}></Row>
              <Row title="다큐멘터리" movie={documentaries}></Row>
              <Row title="찜한 목록" picked={true}></Row>
            </div>

            <Footer></Footer>
          </>
        )}
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Main;
