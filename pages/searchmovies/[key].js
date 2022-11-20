import { useRouter } from "next/router";
import useSWR from "swr";
import Link from 'next/link'
import { useEffect } from "react";

export default function MovieSearched(){
    
    useEffect(() => {
        document.getElementsByTagName("body")[0].setAttribute("id", "bodyPage")
        document.getElementsByTagName("html")[0].setAttribute("id",  "htmlPage")
    })

    const router = useRouter()
    const {key} = router.query 

    const {data, error} = useSWR(`http://www.omdbapi.com/?apikey=4029b34&s=${key}&type=movie`, fetcher)

    
    if (error) return (<div>fetch error...</div>)
    if (!data) return (<div class="loading">carregando...</div>)
    if (!data.Search) return (<div id="noresult"><p>Nenhum resultado encontrado</p></div>)

    
    return (
        <div class="movieLink">
            {data.Search.map(m => 
            <div id="movieContainer">
                <img src={m.Poster}></img>
                <Link id="link" href={`/onemovie/${m.imdbID}`}>{m.Title}</Link>

            </div>
            )}
        </div>
    )
}

async function fetcher(url){
    const res = await fetch(url)
    const json = res.json()
    
    return json
}