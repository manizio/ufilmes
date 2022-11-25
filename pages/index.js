import useSWR from 'swr'
import {useEffect, useState} from 'react'
import Link from 'next/link'

export default function Movies3(){
    const [state, setState] = useState({url:'', searchString:''})
    const {data, error} = useSWR(state, async (u) => {
        if (!u.url || !u.searchString) return {Search: ''}
        if (u.url === '' || u.searchString === '') return {Search: ''}

        const res = await fetch(`${u.url}/?apikey=4029b34&s=${u.searchString}&type=movie`)
        const json = await res.json()

        return json
    })

    const onClickHandler = (e) => {
        if (e.key === 'Enter')
        {
            e.preventDefault()
            setState({url:'https://www.omdbapi.com', searchString: e.target.value})

        }
    }

    return (
        <div id="global">
            <div id="logo">
                <img src="https://i.imgur.com/fWKrDyM.png"/>
            </div>
            <TheForm handler={onClickHandler}/>
            <div id="moviesDiv">
                <TheMovies data={error? {error:'Erro na pesquisa'}: data ? data:{Search:''}} show={state.url!==''}/>
            </div>

        </div>
    )

}

//<TheLink id="link" url={state.url} handler = {onClickHandler}/>

export function TheMovies({data, show}){

    const [state, setState] = useState({all: [], filter:[]})

    useEffect(() => {
        setState({all: data.Search, filter:[]})
    }, [data])


    if (!show) return (<div></div>)
    if(state.error) return (<div>falha na requisição...</div>)
    if(state.all === '') return (<div id="loading">carregando</div>)
    if (!state.all) return (<div id="noresult"><p>Nenhum resultado encontrado</p></div>)
    return(
        <div class="movieLink">
            {state.all.map(m => 
            <div id="movieContainer">
                <img src={m.Poster}></img>
                <Link id="link" href={`/onemovie/${m.imdbID}`}>{m.Title}</Link>

            </div>
            )}
        </div>
    )
}

export function TheLink({url, handler}){
    return(
        <div>
            <a href="/movies3.js" onClick={handler} >{url === '' ? 'Mostrar' : 'Ocultar'}</a>
        </div>
    )
}

export function TheForm({handler}){
    return(
        <div class="formDiv">
            <form>
                <label htmlFor='search'>Procurar Filme</label>
                <input id="search" name="search" type="text" placeholder='Pesquisar' autoComplete='true' onKeyDown={handler}></input>
            </form>
        </div>
    )
}