const isLoggedIn = localStorage.getItem("authenticated")===null ? false : true;

export default isLoggedIn;