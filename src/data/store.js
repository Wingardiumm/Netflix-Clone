export const likedMovie = data =>({ type: 'LIKED', payload : data});

const initState = 
    {movie : []
    }

export const reducer = (state = initState, action) =>{
    let copy = state;
    switch (action.type) {
        case 'LIKED' :
            let res = copy.movie.filter(data => data.id === action.payload.id).length >0;
            console.log(action.payload.id, copy, res)
            if(res) {
                let filtered = copy.movie.filter((data) => data.id !== action.payload.id);
                copy.movie=filtered;
                return copy;
            } else{
                copy.movie.push(action.payload)
                return copy;
            }
        default:
            return state;
    }
}

export default reducer;