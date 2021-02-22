import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div className="homePageWrapper">
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
