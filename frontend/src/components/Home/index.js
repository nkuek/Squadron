import { useSelector } from 'react-redux';

import './home.css';
import Banner from './Banner';
import EventList from './EventList';
const Home = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <div className="homePageContent">
            {!user ? <Banner /> : <></>}
            <EventList />
        </div>
    );
};

export default Home;
