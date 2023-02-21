// Typically we would store in {process.env.API_KEY}
const API_KEY = "8ffd39bd41394d26d480bf82cb257d60";
const kor = "&language=ko";


const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}${kor}`,
    fetchTrendingWithVideo: `/trending/all/week?api_key=${API_KEY}&with_networks=213&append_to_response=videos,images${kor}`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&append_to_response=videos,images${kor}`,
    fetchTopRated: `movie/top_rated?api_key=${API_KEY}&with_networks=213${kor}`,
    fetchActionMovies: `discover/movie?api_key=${API_KEY}&with_genres=28${kor}`,
    fetchComedyMovies: `discover/movie?api_key=${API_KEY}&with_genres=35${kor}`,
    fetchHorrorMovies: `discover/movie?api_key=${API_KEY}&with_genres=27${kor}`,
    fetchRomanceMovies: `discover/movie?api_key=${API_KEY}&with_genres=10749${kor}`,
    fetchDocumentaries: `discover/movie?api_key=${API_KEY}&with_genres=99${kor}`,
}

export default requests;