import { useSelector } from 'react-redux';

import './home.css';
import Banner from './Banner';
import HomeEventList from './HomeEventList';
const Home = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <div className="homePageContent">
            <Banner />
            <HomeEventList />
        </div>
    );
};

export default Home;
