import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './newsquad.css';

const NewSquadForm = () => {
    const [squadName, setSquadName] = useState('');
    const user = useSelector((state) => state.session.user);

    return (
        <>
            <div className="nsfWrapper">
                <div className="newSquadContainer">
                    <div className="nsfContainer">
                        <div className="closensfContainer">
                            <Link to="/squads" className="closensf">
                                <i className="fas fa-arrow-left closeFormArrow">
                                    {' Back'}
                                </i>
                            </Link>
                        </div>
                        <span className="nsfHeaderContainer">
                            <h1 className="nsfHeader">Create Squad</h1>
                        </span>
                        <div className="nsfInputContainer">
                            <span
                                style={{ color: 'white' }}
                                className="nsfSquadName"
                            >
                                Squad Name
                            </span>
                            <input
                                type="text"
                                value={squadName}
                                onChange={(e) => setSquadName(e.target.value)}
                            ></input>
                        </div>
                        <div className="nsfInputContainer">
                            <span
                                style={{ color: 'white' }}
                                className="nsfCaptain"
                            >
                                Description
                            </span>
                        </div>
                    </div>

                    <div className="nsfPreviewWrapper">
                        <div className="squadOuterContainer">
                            <div className="squadInnerContainer">
                                <div className="nsfPreviewHeader">
                                    <p className="preview">Preview</p>
                                </div>
                                <div className="squadName">
                                    <h1>
                                        {!squadName ? 'Squad Name' : squadName}
                                    </h1>
                                </div>
                                <div className="captainName">
                                    <h2>{`Captain: ${user.username}`}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewSquadForm;
