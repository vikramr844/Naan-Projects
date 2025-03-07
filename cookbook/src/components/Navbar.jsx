import React, { useEffect } from 'react';
import '../styles/Navbar.css';
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = React.useState('');

  // Smooth scroll when hash changes
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      if (response.data.meals && response.data.meals.length > 0) {
        setSearch('');
        navigate(`/recipie/${response.data.meals[0].idMeal}`);
      } else {
        throw new Error('No recipe found');
      }
    } catch (error) {
      alert('No such recipe found!!');
      setSearch('');
      navigate('/');
    }
  };

  const handlePopularClick = () => {
    if (!location.pathname.startsWith('/category/Chicken')) {
      // If user is not already on `/`, navigate to `/#popular`
      navigate('/#popular');
    } else {
      // Otherwise, update the hash only
      window.location.hash = "popular";
    }
  };

  return (
    <div className='Navbar'>
      <h3 onClick={() => navigate('/')}>SB Recipess...</h3>
      <div className='nav-options'>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={handlePopularClick}>Popular</li>
        </ul>
        <div className="nav-search">
          <span>
            <IoSearch className='nav-search-icon' />
            <input 
              type="text" 
              placeholder="Type something.." 
              onChange={(e) => setSearch(e.target.value)} 
              value={search} 
            />
          </span>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
