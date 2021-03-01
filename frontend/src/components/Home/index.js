import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import { getSearchResults } from '../../store/search';
import './home.css';
import Banner from './Banner';
import HomeEventList from './HomeEventList';

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const user = useSelector((state) => state.session.user);

    const handleSplashRegister = () => {
        history.push('/register');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;
        await dispatch(getSearchResults(search));

        // reset search bar content back to empty on submission
        setSearch('');

        history.push(`/search/${search}`);
    };
    return (
        <div className="homePageWrapper">
            <Helmet>
                <title>Squadron</title>
                <meta name="description" content="home page"></meta>
            </Helmet>
            <Banner />

            <div className="homePageContent">
                <form
                    style={{ display: user && 'none' }}
                    onSubmit={handleSearch}
                    className="homePageSearchForm"
                >
                    <div className="homePageSearchContainer">
                        <div className="homePageSearchIconContainer">
                            <span className="homePageSearchIcon fa fa-search"></span>
                        </div>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            className="homePageSearchInput"
                            placeholder="Search for games, squads, or users"
                        ></input>
                        <button
                            onClick={handleSearch}
                            className="homePageSearchSubmit"
                        >
                            Search
                        </button>
                    </div>
                </form>
                <HomeEventList />
                {!user && (
                    <div className="squadronHomePageDescriptionContainer">
                        <div className="squadronSplashContainer1">
                            <div className="squadronSplashHeadingContainer">
                                <div className="squadronSplashHeading">
                                    It's dangerous to go alone!
                                </div>
                            </div>
                        </div>
                        <div className="squadronSplashContainer2">
                            <div className="squadronSplashHeadingContainer">
                                <div className="squadronSplashHeading">
                                    Take this.
                                </div>
                            </div>
                        </div>
                        <div className="splashRegisterButtonContainer">
                            <button
                                onClick={handleSplashRegister}
                                className="splashRegisterButton"
                            >
                                Squad Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
