import {useRouter} from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export default function Movie(){

    useEffect(()=>{
        document.getElementsByTagName("body")[0].setAttribute("id", "bodyPage")
        document.getElementsByTagName("html")[0].setAttribute("id",  "htmlPage")
    })

    const router = useRouter()
    const {id} = router.query
    const {data, error} = useSWR(`https://www.omdbapi.com/?apikey=4029b34&i=${id}&plot=full`, fetcher) 

    if(error) return (<div>fetch error..</div>)
    if(!data) return (<div class="loading">loading...</div>)

    return(
        <div class="paginaDetalhes">
            <div id="poster">
                <img src={data.Poster}/>
                <p>Nota: {data.imdbRating}</p>
            </div>
            <section id="descricao">
                <div id="containerInformacoes">
                    <p id="titulo">{data.Title} </p><p id="ano">{data.Year}</p> <p id="diretor">Dirigido por: <p id="diretorNome">{data.Director}</p></p>
                </div>
                <div id="plot">
                    {data.Plot}
                </div>
            </section>
        </div>
    )



}

async function fetcher(url){

    const res = await fetch(url)
    const json = await res.json()

    return json
}