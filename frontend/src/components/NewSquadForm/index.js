import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './newsquad.css';

const NewSquadForm = () => {
    const [squadName, setSquadName] = useState('');

    useEffect(() => {});

    return (
        <>
            <div className="newSquadFormWrapper">
                <div className="newSquadFormContainer">
                    <div className="closeNewSquadFormContainer">
                        <Link to="/squads" className="closeNewSquadForm">
                            <i className="fas fa-arrow-left closeFormArrow"></i>
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

                <div className="newSquadFormPreviewContainer">
                    <h1>{squadName}</h1>
                </div>
            </div>
        </>
    );
};

export default NewSquadForm;
