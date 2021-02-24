import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './newsquad.css';

const NewSquadForm = () => {
    const [squadName, setSquadName] = useState('');
    const [description, setDescription] = useState('');
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
                        <div className="captainNameContainer">
                            <div className="nsfcaptainName">
                                <div style={{ fontSize: '1.1em' }}>
                                    {user.username}
                                </div>
                                <div
                                    style={{
                                        fontSize: '.9em',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    Captain
                                </div>
                            </div>
                        </div>
                        <div className="nsfInputContainer">
                            <div
                                style={{ color: 'white' }}
                                className="nsfLabel"
                            >
                                Squad Name
                            </div>
                            <input
                                className="nsfInput"
                                type="text"
                                value={squadName}
                                onChange={(e) => setSquadName(e.target.value)}
                                required
                            ></input>
                        </div>
                        <div className="nsfInputContainer">
                            <div
                                style={{ color: 'white' }}
                                className="nsfLabel"
                            >
                                Description
                            </div>
                            <input
                                className="nsfInput"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></input>
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
                                <div className="squadDescription">
                                    <p style={{ margin: '16px 10px' }}>
                                        {!description
                                            ? 'Squad Description'
                                            : description}
                                    </p>
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
