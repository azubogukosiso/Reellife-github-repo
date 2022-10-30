// import { NavLink, useNavigate } from "react-router-dom";
import "./css/Header.css";

const Header = (props) => {
  // const navigate = useNavigate();
  
  return (
    <>
      <div className='main'>
        <a href="/" className='text-decoration-none'>
          <h3 className='brand'>Reellife🎬</h3>
        </a>
        <div className="search-container rounded d-flex justify-content-evenly p-1">
          <input type="text" value={props.value} onChange={(event) => props.setSearchValue(event.target.value)} placeholder="Enter movie keywords..." className="search-bar form-control rounded border border-light p-2 w-75"/>
          <button className="cat-btn search-btn rounded w-25" onClick={() => {props.getMovieRequest(props.searchValue)}}>Search</button>
        </div>
        {/* <a className="fav-btn rounded border border-light p-2" href="#">View All Favourites</a> */}
      </div>

      <div className="sub py-3">
        <button className="cat-btn rounded p-2 mx-3 border border-light" onClick={() => {props.getMovieRequest(props.searchValue)}}>All</button>
        <button className="cat-btn rounded p-2 mx-3 border border-light" onClick={() => {props.getMovieRequestMovies(props.searchValue)}}>Movies</button>
        <button className="cat-btn rounded p-2 mx-3 border border-light" onClick={() => {props.getMovieRequestSeries(props.searchValue)}}>Series</button>
      </div>
    </>
  )
}

export default Header
