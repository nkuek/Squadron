import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './newsquad.css';

const NewSquadForm = () => {
    const [squadName, setSquadName] = useState('');

    useEffect(() => {});

    return (
        <>
            <div className="newSquadFormWrapper">
                <div className="newSquadContainer">
                    <div className="newSquadFormContainer">
                        <div className="closeNewSquadFormContainer">
                            <Link to="/squads" className="closeNewSquadForm">
                                <i className="fas fa-arrow-left closeFormArrow">
                                    {' Back'}
                                </i>
                            </Link>
                        </div>
                        <span className="newSquadFormHeaderContainer">
                            <h1 className="newSquadFormHeader">Create Squad</h1>
                        </span>
                        <div className="newSquadFormSquadNameContainer">
                            <span
                                style={{ color: 'white' }}
                                className="newSquadFormSquadName"
                            >
                                Squad Name
                            </span>
                            <input
                                type="text"
                                value={squadName}
                                onChange={(e) => setSquadName(e.target.value)}
                            ></input>
                        </div>
                    </div>

                    <div className="newSquadFormPreviewWrapper">
                        <div className="squadOuterContainer">
                            <div className="squadInnerContainer">
                                <div className="newSquadFormPreviewHeader">
                                    <p className="preview">Preview</p>
                                </div>
                                <div className="squadName">
                                    <h1>
                                        {!squadName ? 'Squad Name' : squadName}
                                    </h1>
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
