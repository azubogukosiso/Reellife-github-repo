// import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import NoData from './NoData';
import MovieDisplay  from './MovieDisplay';
import MovieFavourites from './MovieFavourites';
import Footer from './Footer';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);
  const [heading, setHeading] = useState('');

  const checkSearchValue = () => {
    if (searchValue === ''){
      setErrorMsg(false);
      setMovies([]);
    }
  }

  const handleRequest = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else{
      setErrorMsg(true);
    }
  }

  const getMovieRequest = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      setHeading('All Categories');
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}`;
      handleRequest(url);
    }
  }

  const getMovieRequestMovies = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      setHeading('Only Movies');
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}&type=movie`;
      handleRequest(url);
    }
  }

  const getMovieRequestSeries = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      setHeading('Only Series');
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}&type=series`;
      handleRequest(url);
    }
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  }
  
  let component;
  if (movies.length == 0){
    if (errorMsg){
      component = <NoData />
    } else{
      component = <Home />
    }
  } else{
    component = <MovieDisplay movies={movies} setMovies={setMovies} heading={heading} handleFavouritesClick={addFavouriteMovie} />
  }

  useEffect(() => {
    checkSearchValue()
  }, [searchValue]);

  return (
    <>
      <Header 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
        getMovieRequest={getMovieRequest} 
        getMovieRequestMovies={getMovieRequestMovies} 
        getMovieRequestSeries={getMovieRequestSeries} 
      />
      {component}
      <Footer/>
    </>
  )
}

export default Main
