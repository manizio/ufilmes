import useSWR from "swr";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function APesquisa(){
    const [state, setState] = useState({url: '', searchString: '', searchYear: '', searchID: ''})
    const {data, error} = useSWR(state, async (u) => {
        console.log('teste3')
        if (!u.url || !u.searchString || !u.searchYear) return {Search: ''}
        if (u.url === '' || u.searchString === '' || u.searchYear === '') return {Search: ''}   

        const res = await fetch(`${u.url}/?apikey=4029b34&s=${u.searchString}&y=${u.searchYear}&type=movie`)
        const json = await res.json()

        return json
    })
    const onClickHandler = (e) =>{
        e.preventDefault()
        setState({url:'https://www.omdbapi.com', searchString: e.target[0].value, searchYear: e.target[1].value})

    }

    return(
        <div id="global">
            <div id="logo">
                <img src="https://i.imgur.com/fWKrDyM.png"/>
            </div>
            <TheForm handler={onClickHandler}/>
            <div id="moviesDiv">
                <TheFilter data={error ? {error: 'Erro na pesquisa'}: data ? data:{Search: ''} } url={state.url} />
            </div>
        </div>
        
    )

}

export function TheForm({handler}){
    return (
        <div className="formDiv">
            <form id="formTitulo" onSubmit={handler}>
                <div>
                    <label htmlFor="search">Procurar Filme</label>
                    <input id="search" name="search" type="text" placeholder='Pesquisar' autoComplete='true'></input>
                    <label htmlFor="year">Ano</label>
                    <input id="year" name="year" type="number" placeholder="Ano" autoComplete="true" ></input>
                    <input id="button" type="submit" value="Pesquisar"/>
                </div>
            </form>
        </div>
    )
}


export function TheMovies({data,show, f}){
    const [state, setState] = useState({all: [], filter: []})

    useEffect(() => {
        setState({all: data.Search, filter: f})
        
    }, [data, f])



    if (!show) return (<div></div>)
    if(state.error) return (<div>falha na requisição</div>)
    if (state.all === '') return (<div id ="loading">carregando</div>)
    if (!state.all) return (<div id="noresult"><p>Nenhum resultado encontrado</p></div>)

    if(state.filter === 'cresc'){
        state.all.sort((a,b) => a.Title.localeCompare(b.Title))
    } else if(state.filter === 'dec'){
        state.all.sort((a,b) => -1 * a.Title.localeCompare(b.Title))
    }
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

export function TheFilter({data, url}){

    const [state, setState] = useState({f: []})

    const handleChange = (e) =>{
        setState({f: e.target.value})        
    }

    return(
        <div id="filtroContainer">
        <form>
            <label htmlFor="filtro">Filtro: </label>
            <select id="filtro" name="filtro" onChange={handleChange}>
                <option value="" selected disabled hidden>Filtrar</option>
                <option value="cresc">Crescente</option>
                <option value="dec">Decrescente</option>
            </select>
        </form>
        <TheMovies data={data} show = {url !== ''} f=  {state.f}/>
        </div>

    )
}