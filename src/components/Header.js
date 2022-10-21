import { NavLink, useNavigate } from "react-router-dom";
import "./css/Header.css";

const Header = (props) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className='main'>
        <NavLink to='/' className='text-decoration-none'>
          <h3 className='brand'>Reellife🎬</h3>
        </NavLink>
        <div className="search-container rounded d-flex justify-content-evenly p-1">
          <input type="text" value={props.value} onChange={(event) => props.setSearchValue(event.target.value)} placeholder="Enter movie keywords..." className="search-bar form-control rounded border border-light p-2 w-75"/>
          <button className="cat-btn search-btn rounded w-25" onClick={() => {props.getMovieRequest(props.searchValue); navigate('all');}}>Search</button>
        </div>
        <button className="fav-btn rounded border border-light p-2">View All Favourites</button>
      </div>

      <div className="sub py-3">
        <NavLink className="cat-btn rounded p-2 mx-3 border border-light" onClick={() => {props.getMovieRequest(props.searchValue); props.checkSearchValue();}} to="/all" end>All</NavLink>
        <NavLink className="cat-btn rounded p-2 mx-3 border border-light" onClick={() => {props.getMovieRequestMovies(props.searchValue); props.checkSearchValue();}} to="/movies">Movies</NavLink>
        <NavLink className="cat-btn rounded p-2 mx-3 border border-light" onClick={() => {props.getMovieRequestSeries(props.searchValue); props.checkSearchValue();}} to="/series">Series</NavLink>
      </div>
    </>
  )
}

export default Header
