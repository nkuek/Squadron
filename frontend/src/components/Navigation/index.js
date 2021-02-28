import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import './navigation.css';
import ProfileButton from './ProfileButton.js';
import { getSearchResults } from '../../store/search';
import { findAllSquads } from '../../store/squads';

const Navigation = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const [search, setSearch] = useState('');

    // Enables hamburger menu bar transition
    const addChange = (e) => {
        document.querySelector('.stickyDropDownMenu');
        e.target.classList.toggle('change');

        // Shows drop down menu when clicked
        document.querySelector('.stickyDropDownMenu')?.classList.toggle('show');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;
        const searchResults = await dispatch(getSearchResults(search));
        localStorage.setItem('search', JSON.stringify(searchResults));

        // reset search bar content back to empty on submission
        setSearch('');

        history.push(`/search/${search}`);
    };

    const handleSquads = async () => {
        const allSquads = await dispatch(findAllSquads());
        localStorage.setItem('allSquads', JSON.stringify(allSquads));
        history.push('/squads');
    };

    // Closes drop down menu when clicking anywhere else
    window.addEventListener('click', (e) => {
        if (!e.target?.classList.contains('barContainer')) {
            document
                .querySelector('.stickyDropDownMenu')
                ?.classList.remove('show');
            document.querySelector('.barContainer')?.classList.remove('change');
        }
    });

    return (
        <>
            <nav className="mainNavBar">
                <div className="menu">
                    <div className="barContainer" onClick={addChange}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                    <div className="logoContainer">
                        <NavLink className="home" to="/">
                            Squadron
                        </NavLink>
                    </div>
                    <form className="searchForm" onSubmit={handleSearch}>
                        <div className="searchBarContainer">
                            <div className="searchBar">
                                <div className="searchInputContainer">
                                    <span
                                        onClick={handleSearch}
                                        className="fa fa-search searchButtonContainer"
                                    ></span>
                                    <input
                                        placeholder="Search..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="searchInput"
                                        type="text"
                                    ></input>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="loginLogoutSignup">
                    {!sessionUser ? (
                        <>
                            <NavLink className="login" to="/login">
                                Login
                            </NavLink>
                            <NavLink className="signup" to="/register">
                                Sign Up
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to={'/squads/create'}
                                className="createSquad large"
                            >
                                + Create a squad
                            </NavLink>
                            <NavLink
                                to={'/squads/create'}
                                className="createSquadPlus small"
                            >
                                +
                            </NavLink>
                            <ProfileButton user={sessionUser} />
                        </>
                    )}
                </div>
            </nav>
            <div className="stickyDropDownMenu">
                <ul className="dropDownLinks">
                    <li>
                        <NavLink className="navBarLinks" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={handleSquads}
                            to={'/squads'}
                            className="navBarLinks"
                        >
                            Squads
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navBarLinks" to="/games">
                            Games
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navBarLinks" to="/about">
                            About Me
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navigation;
