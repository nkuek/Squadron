import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import './navigation.css';
import ProfileButton from './ProfileButton.js';
import { getSearchResults } from '../../store/search';
import { findAllSquads } from '../../store/allSquads';

const Navigation = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const [search, setSearch] = useState('');

    const showSearch = (e) => {
        document.querySelector('.dropDownSearch')?.classList.toggle('show');
    };
    // Enables hamburger menu bar transition
    const addChange = (e) => {
        e.target.classList.toggle('change');

        // Shows drop down menu when clicked
        document.querySelector('.stickyDropDownMenu')?.classList.toggle('show');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;
        await dispatch(getSearchResults(search));

        // reset search bar content back to empty on submission
        setSearch('');

        document.querySelector('.dropDownSearch')?.classList.remove('show');

        history.push(`/search/${search}`);
    };

    const handleSquads = async () => {
        await dispatch(findAllSquads());
        history.push('/squads/explore');
    };

    // window.addEventListener('click', (e) => {
    //     if (!e.target.classList.contains('.dropDownSearch')) {
    //         document.querySelector('.dropDownSearch').classList.remove('show');
    //     }
    // });

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
                        <div
                            className="searchBarContainer"
                            style={{
                                display: !sessionUser && 'none',
                            }}
                        >
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
                                <div
                                    onClick={showSearch}
                                    className="fa fa-search hiddenSearchButton"
                                ></div>
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
                            <div className="createSquadPlusContainer">
                                <NavLink
                                    to={'/squads/create'}
                                    className="fas fa-plus createSquadPlus small"
                                ></NavLink>
                            </div>
                            <ProfileButton user={sessionUser} />
                        </>
                    )}
                </div>
            </nav>
            <form onSubmit={handleSearch} className="dropDownSearch">
                <span className="fa fa-search"></span>
                <input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="hiddenSearch"
                    type="text"
                ></input>
            </form>
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
