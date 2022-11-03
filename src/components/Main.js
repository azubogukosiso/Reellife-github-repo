import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
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
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    } else{
      setErrorMsg(true);
      setLoading(false);
    }
  }

  const getMovieRequest = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      setLoading(true);
      setHeading('All Categories');
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}`;
      handleRequest(url);
    }
  }

  const getMovieRequestMovies = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      setLoading(true);
      setHeading('Only Movies');
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}&type=movie`;
      handleRequest(url);
    }
  }

  const getMovieRequestSeries = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      setLoading(true);
      setHeading('Only Series');
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}&type=series`;
      handleRequest(url);
    }
  }

  const saveToLocalStorage = (items) => {
    localStorage.setItem('reellife-favourites', JSON.stringify(items));
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }
  
  let component;
  if (movies.length == 0){
    if (errorMsg){
      component = <NoData />
    } else{
      component = <Home />
    }
  } else{
    component =
      loading ?

      <MoonLoader
        color={"#fff"}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        className='mt-5'
      />

      :

      <MovieDisplay
        movies={movies} 
        setMovies={setMovies} 
        heading={heading} 
        handleFavouritesClick={addFavouriteMovie} 
      />
  }

  useEffect(() => {
    checkSearchValue()
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('reellife-favourites'));
    setFavourites(movieFavourites);
  }, []);

  return (
    <>
      <Header 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
        getMovieRequest={getMovieRequest} 
        getMovieRequestMovies={getMovieRequestMovies} 
        getMovieRequestSeries={getMovieRequestSeries} 
      />
      <div className='d-flex align-items-center justify-content-center'>
        <Routes>
          <Route path='/' element={component} />
          <Route path='/favourites' element={<MovieFavourites movies={favourites} handleFavouritesClick={removeFavouriteMovie} />} />
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default Main
