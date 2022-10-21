import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import MovieDisplay  from './MovieDisplay';
import MovieDisplayMovies  from './MovieDisplayMovies';
import MovieDisplaySeries from './MovieDisplaySeries';
import NoData from './NoData';
import Footer from './Footer';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const checkSearchValue = () => {
    if (searchValue === ''){
      navigate('/');
      setMovies([]);
    }
  }

  const handleRequest = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else{
      navigate('/no-data');
    }
  }

  const getMovieRequest = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}`;
      handleRequest(url);
    }
  }

  const getMovieRequestMovies = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}&type=movie`;
      handleRequest(url);
    }
  }

  const getMovieRequestSeries = async (searchValue) => {
    if (searchValue === ''){
      alert('Type in some keywords to search');
    } else{
      const url = `https://www.omdbapi.com/?apikey=39de1ca9&s=${searchValue}&type=series`;
      handleRequest(url);
    }
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
        checkSearchValue={checkSearchValue} 
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='all' element={<MovieDisplay movies={movies} setMovies={setMovies} searchValue={searchValue} />} />
        <Route path='movies' element={<MovieDisplayMovies movies={movies} setMovies={setMovies} searchValue={searchValue} />} />
        <Route path='series' element={<MovieDisplaySeries movies={movies} setMovies={setMovies} searchValue={searchValue} />} />
        <Route path='no-data' element={<NoData searchValue={searchValue} />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default Main
