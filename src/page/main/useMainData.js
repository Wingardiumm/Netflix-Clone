import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { moviesApi, tvApi } from "../../api";

const useMainData = () => {
    const dispatch = useDispatch();
    const [nowPlaying, setNowPlaying] = useState();
    const [pastOneYear, setPastOneYear] = useState();
    const [comedy, setComedy] = useState();
    const [horror, setHorror] = useState();
    const [action, setAction] = useState();
    const [documentaries, setDocumentaries] = useState();
    const [loadingFlag, setLoadingFlag] = useState(false);

    useEffect(() => {
        setLoadingFlag(true);
        async function fetchData() {
            const nowPlaying = await moviesApi.nowPlaying();
            setNowPlaying(nowPlaying.data.results);
            const pastOneYear = await tvApi.pastOneYear();
            setPastOneYear(pastOneYear.data.results);
            const comedy = await moviesApi.comedy();
            setComedy(comedy.data.results);
            const horror = await moviesApi.horror();
            setHorror(horror.data.results);
            const action = await moviesApi.action();
            setAction(action.data.results);
            const documentaries = await moviesApi.documentaries();
            setDocumentaries(documentaries.data.results);
            setTimeout(() => {
                setLoadingFlag(false)
            }, 600);
            console.log(loadingFlag)
        }
        fetchData();
        console.log(loadingFlag)
    }, [])
    return { nowPlaying, pastOneYear, comedy, horror, action, documentaries,loadingFlag }
}

export default useMainData