import { configureStore, createSlice } from "@reduxjs/toolkit";

let overviewOn = createSlice({
    name: 'overviewOn',
    initialState: false,
    reducers: {
        setOverviewOn(state, action) {
            return state = action.payload;
        }
    }
})
let profileData = createSlice({
    name: 'profileData',
    initialState: {},
    reducers: {
        setProfileData(state, action) {
            console.log(action.payload, state)
            return state=action.payload;
        }
    }
})
let likedMovie = createSlice({
    name: 'likedMovie',
    initialState: {
        movie:[]
    },
    reducers: {
        setLikedMovie(state, action) {
            let res = state.movie.some(data => data.id === action.payload.id);
            if(res) {
                let filtered = state.movie.filter((data) => data.id !== action.payload.id);
                state.movie = filtered;
            } else{
                state.movie.push(action.payload)
            }
        }
    }
})


export let { setOverviewOn } = overviewOn.actions
export let { setLikedMovie } = likedMovie.actions
export let { setProfileData } = profileData.actions
export default configureStore({
    reducer: {
        overviewOn: overviewOn.reducer,
        likedMovie: likedMovie.reducer,
        profileData: profileData.reducer,
    }
})