import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import './pagenotfound.css';

const PageNotFound = () => {
    const [korokHidden, setKorokHidden] = useState(true);
    const history = useHistory();

    const korokImg =
        'https://i.kym-cdn.com/photos/images/original/001/247/542/6e5.jpg';

    const rockImg = '/rock.png';

    useEffect(() => {
        history.push('/pageNotFound');
    }, []);

    return (
        <div className="pageNotFoundWrapper">
            <Helmet>
                <title>Page Not Found - Squadron</title>
                <meta name="description" content="page not found"></meta>
            </Helmet>
            <div className="pageNotFoundContainer">
                <h1 className="pageNotFoundHeader"> Page Not Found</h1>
                <div className="pageNotFoundImage">
                    {!korokHidden ? (
                        <div className="korokContainer">
                            <img
                                className="korok"
                                style={{ borderRadius: '10px' }}
                                src={korokImg}
                            ></img>
                            <div className="pageNotFoundSubHeader">
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginTop: '10px',
                                    }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <div className="rockContainer">
                            <img
                                className="rock"
                                onClick={() => setKorokHidden(false)}
                                src={rockImg}
                                style={{ width: '100px', height: '100px' }}
                            ></img>
                        </div>
                    )}
                </div>
                <div className="homeLinkContainer">
                    <button onClick={() => history.go(-2)}>Go back</button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
