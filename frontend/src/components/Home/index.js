import './home.css';
import Banner from './Banner';
import EventList from './EventList';
const Home = () => {
    return (
        <div className="homePageContent">
            <Banner />
            <EventList />
        </div>
    );
};

export default Home;
