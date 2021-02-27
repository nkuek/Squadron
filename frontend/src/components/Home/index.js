import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import './home.css';
import Banner from './Banner';
import HomeEventList from './HomeEventList';
const Home = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <div className="homePageContent">
            <Helmet>
                <title>Squadron</title>
                <meta name="description" content="home page"></meta>
            </Helmet>
            <Banner />
            <HomeEventList />
        </div>
    );
};

export default Home;
