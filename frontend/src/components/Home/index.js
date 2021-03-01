import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import { getSearchResults } from '../../store/search';
import './home.css';
import Banner from './Banner';
import HomeEventList from './HomeEventList';
import {
    videoGameStockPhoto1,
    videoGameStockPhoto2,
} from '../../images/imageUrls';

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const user = useSelector((state) => state.session.user);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;
        await dispatch(getSearchResults(search));

        // reset search bar content back to empty on submission
        setSearch('');

        history.push(`/search/${search}`);
    };
    return (
        <div className="homePageContent">
            <Helmet>
                <title>Squadron</title>
                <meta name="description" content="home page"></meta>
            </Helmet>
            <Banner />

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
                        placeholder="Find your next squad"
                    ></input>
                    <div
                        onClick={handleSearch}
                        className="homePageSearchSubmit"
                    >
                        Search
                    </div>
                </div>
            </form>
            <HomeEventList />
            {!user && (
                <div className="squadronHomePageDescriptionContainer">
                    <img
                        width="500px"
                        className="stockPhotos"
                        src={videoGameStockPhoto2}
                    ></img>
                </div>
            )}
        </div>
    );
};

export default Home;
