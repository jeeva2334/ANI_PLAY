import axios from 'axios';
import React,{createContext,useEffect,useState} from 'react'

export const AnimeProvider = createContext(null);

function AnimeHook({children}) {
    const [list,setList] = useState(["hello","h1"])
    const [isLoading,setisLoading] = useState(false);
    const [topAired,setTopAired] = useState([])
    const [movies,setMovies] = useState([])
    const [result,setresult] = useState([])
    const [resultManga,setresultManga] = useState([])
    useEffect(()=>{
        setisLoading(true)
        fetchPopular();
        fetchTopAired();
        getTopMovies();
        setisLoading(false)
    },[])
    const fetchPopular = async () =>{
        const fetchList = await axios.get('https://webdis-gtio.onrender.com/popular?page=1')
        setList(fetchList.data)
        console.log(fetchList.data)
    }
    const fetchTopAired = async() => {
        const topAir = await axios.get('https://api.consumet.org/anime/gogoanime/top-airing?page=1')
        setTopAired(topAir.data.results)
        console.log(topAir.data.results)
    }
    const getTopMovies = async() => {
        const {data} = await axios.get('https://webdis-gtio.onrender.com/anime-movies?page=1')
        setMovies(data)
    }
    const search = async(search:string,page:number = 1) => {
        const {data} = await axios.get('https://api.consumet.org/anime/gogoanime/'+search+'?page='+page)
        setresult(data.results)
        console.log(data.results)
    }
    const searchManga = async(search) => {
        const {data} = await axios.get('https://api.consumet.org/manga/mangadex/'+search)
        console.log(data.results.image)
        setresultManga(data.results)
    }
    return(
        <AnimeProvider.Provider value={{list,isLoading,topAired,movies,search,result,setresult,searchManga,resultManga,setresultManga}}>
            {children}
        </AnimeProvider.Provider>
    )
}

export default AnimeHook