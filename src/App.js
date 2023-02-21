import "./App.css";
import LandingPage from "./page/landingPage";
import LoginPage from "./page/loginPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./page/main/mainPage";
import TestContainer from "./component/Test";
import DetailPage from "./page/Detail/DetailPage";
import ProfilePage from "./page/profilePage/ProfilePage";

function App() {
  const authenticated = localStorage.getItem('authenticated') ? true : false;
  const isMovie = false;
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<LandingPage/>}>
          {/* <Footer></Footer> */}
          {/* <Header></Header> */}
        </Route>
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/main" element={<Main></Main>}>
          <Route path="detail/:id" element={<DetailPage></DetailPage>} />
          <Route path="tv/:id" element={<DetailPage isMovie={isMovie}></DetailPage>} />
        </Route>
        <Route path="/test" exact element={<TestContainer />} />
        <Route path="/profile" exact element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
