import { useEffect, useState } from "react"
import { moviesApi, tvApi } from "../../api";

const useDetailData = (id, isMovie) => {

    const [movie, setMovie] = useState();
    const [cast, setCast] = useState();
    const [keyword, setKeyword] = useState();
    const [reviews, setReviews] = useState();
    const [image, setImage] = useState();
    const [recommendations, setRecommendations] = useState();

    useEffect(() => {
        async function fetchData() {
            if (isMovie) {
                const request = await moviesApi.movieDetail(id);
                setMovie(request.data);
                const cast = await moviesApi.credits(id);
                setCast(cast.data);
                const keywords = await moviesApi.keywords(id);
                setKeyword(keywords.data);
                const reviews = await moviesApi.reviews(id);
                setReviews(reviews.results);
                const image = await moviesApi.images(id);
                setImage(image.data);
                const recommendations = await moviesApi.recommendations(id);
                setRecommendations(recommendations.data.results);
            } else {
                const request = await tvApi.tvDetail(id);
                setMovie(request.data);
                const cast = await tvApi.credits(id);
                setCast(cast.data);
                const keywords = await tvApi.keywords(id);
                setKeyword(keywords.data);
                const reviews = await tvApi.reviews(id);
                setReviews(reviews.results);
                const image = await tvApi.images(id);
                setImage(image.data);
                const recommendations = await tvApi.recommendations(id);
                setRecommendations(recommendations.data.results);
            }
        }
        fetchData(); 
        console.log(movie, keyword, reviews, image, recommendations,id) 
    }, [])
    return { movie, cast, keyword, reviews, image, recommendations }
}

export default useDetailData