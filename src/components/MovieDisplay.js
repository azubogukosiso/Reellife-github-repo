import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./css/MovieDisplay.css";

const MovieDisplay = (props) => {

  const navigate = useNavigate();

  const checkSearchValue = () => {
    if (props.searchValue === ''){
      navigate('/');
    }
  }

  useEffect(() => {
    checkSearchValue()
  }, [props.searchValue]);

  return (
    <div className='mt-5'>
      <h3 className="text-center mb-4">All Categories</h3>
      <div className='row mx-auto d-flex justify-content-center align-items-start'>
        {props.movies.map((movie) => 
          <div className="img-border border border-light border-2 col-3 ms-3 my-2 px-0" key={uuidv4()}>
            <div className="overlay d-flex align-items-center justify-content-center position-absolute w-100 h-100">
              <h5 className="text-center mx-3">{movie.Title}</h5>
              <p>{movie.Year}</p>
              <p>{movie.Type}</p>
              <div>
                <button className="movie-options border border-light border-1 me-3">💖</button>
                <button className="movie-options border border-light border-1">🎬</button>
              </div>
            </div>
            <img src={movie.Poster} alt="movie-poster" className="image img-fluid" />
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieDisplay
