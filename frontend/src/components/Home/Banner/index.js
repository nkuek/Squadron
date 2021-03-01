import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Banner = () => {
    const user = useSelector((state) => state.session.user);
    return (
        <div
            className="homePageBannerWrapper"
            style={{ display: user ? 'none' : 'initial' }}
        >
            <div className="homePageBanner">
                <div className="homePageHeadingContainer">
                    <h1 className="homePageHeader">Find Your Squadron</h1>
                    <h2 className="homePageSubHeader">
                        Create, Collaborate, Dominate
                    </h2>
                </div>
                <div className="joinSquadronContainer">
                    <Link to="/register" className="joinSquadron">
                        Join Squadron
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
