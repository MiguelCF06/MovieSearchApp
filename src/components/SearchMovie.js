import React, { useState } from "react"
import MovieCard from "./MovieCard"

function SearchMovie() {

    const [ query, setQuery ] = useState("")
    const [ movies, setMovies ] = useState([])

    const searchMovies = async (event) => {
        event.preventDefault()
        console.log("submit")

        const url = `https://api.themoviedb.org/3/search/movie?api_key=e50b7d8631c03f16dee01601c561d4e3&language=en-EU&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data.results)
            setMovies(data.results)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="Type your movie..."
                    value={query}
                    onChange={handleChange}
                ></input>
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </>
    )
}

export default SearchMovie