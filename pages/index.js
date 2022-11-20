import useSWR from 'swr'
import {useState} from 'react'
import Link from 'next/link'

export default function Movies3(){
    const [state, setState] = useState({url:'', searchString:''})
    const {data, error} = useSWR(state.url, async (u) => {
        if (!state.url || !state.searchString) return {Search: ''}
        if (state.url === '' || state.searchString === '') return {Search: ''}

        const res = await fetch(`${state.url}/?apikey=4029b34&s=${state.searchString}&type=movie`)
        const json = await res.json()

        return json
    })

    const onClickHandler = (e) => {
        if (e.key === 'Enter')
        {
            e.preventDefault()
            let s = document.getElementById('search').value
            if(state.url === '' || state.searchString === '') setState({url:'http://www.omdbapi.com', searchString: s})
            else setState({url: '', searchString: state.searchString})

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
    if (!show) return (<div></div>)
    if(data.error) return (<div>falha na requisição...</div>)
    if(data.Search === '') return (<div>carregando...</div>)
    if (!data.Search) return (<div id="noresult"><p>Nenhum resultado encontrado</p></div>)
    return(
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