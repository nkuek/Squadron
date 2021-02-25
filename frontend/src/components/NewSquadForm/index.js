import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import testEvents from '../../mockData/testEvents.json';

import '../Squads/squads.css';
import './newsquad.css';
import AspectRatio from 'react-aspect-ratio';

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
                        <form className="nsfForm">
                            <div className="nsfInputContainer">
                                <input
                                    className="nsfInput"
                                    type="text"
                                    value={squadName}
                                    onChange={(e) =>
                                        setSquadName(e.target.value)
                                    }
                                    required
                                ></input>
                                <span className="nsfLabel">Squad Name</span>
                            </div>
                            <div className="nsfInputContainer">
                                <input
                                    className="nsfInput"
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                ></input>
                                <span className="nsfLabel">Description</span>
                            </div>
                        </form>
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
                                <div className="squadMembers">
                                    <i
                                        style={{ cursor: 'pointer' }}
                                        className="fas fa-user-friends"
                                    >
                                        {' 1 Squadmate'}
                                    </i>
                                </div>
                                <div className="squadDescription">
                                    <p>
                                        {!description
                                            ? 'Squad Description'
                                            : description}
                                    </p>
                                </div>
                                <div className="squadEventListWrapper">
                                    <div className="squadEventListContainer">
                                        <div className="squadEventListHeader">
                                            <h3 className="squadEvents">
                                                Upcoming Events
                                            </h3>
                                            <p className="squadAllEvents">
                                                See All
                                            </p>
                                        </div>
                                        <div className="squadEventsContainer">
                                            <ul className="squadEvents">
                                                {testEvents.map((event) => (
                                                    <li
                                                        key={event.id}
                                                        className="squadEventItem"
                                                    >
                                                        <div className="squadEventItemWrapper">
                                                            <div className="squadEventItemContent">
                                                                <div
                                                                    style={{
                                                                        cursor:
                                                                            'pointer',
                                                                    }}
                                                                    className="squadEventLink"
                                                                    to="#"
                                                                >
                                                                    <div className="squadEventContainer">
                                                                        <div className="squadEventImageWrapper">
                                                                            <AspectRatio
                                                                                ratio="16/9"
                                                                                style={{
                                                                                    objectFit:
                                                                                        'cover',
                                                                                    position:
                                                                                        'relatve',
                                                                                    width:
                                                                                        '100%',
                                                                                    height:
                                                                                        'inherit',
                                                                                }}
                                                                                className="squadImageContainer"
                                                                            >
                                                                                <picture>
                                                                                    <img
                                                                                        className="gameImage"
                                                                                        src={
                                                                                            event.image
                                                                                        }
                                                                                    ></img>
                                                                                </picture>
                                                                            </AspectRatio>
                                                                        </div>
                                                                        <div className="squadEventInformationContainer">
                                                                            <p className="eventDate">
                                                                                {
                                                                                    event.date
                                                                                }
                                                                            </p>
                                                                            <p className="eventTitle">
                                                                                {
                                                                                    event.title
                                                                                }
                                                                            </p>
                                                                            <p
                                                                                to="#"
                                                                                className="eventGameLink"
                                                                            >
                                                                                {
                                                                                    event.gameId
                                                                                }
                                                                            </p>
                                                                            <p className="eventDetails">
                                                                                {
                                                                                    event.details
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
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
