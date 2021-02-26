import { Link, NavLink, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import testEvents from '../../mockData/testEvents.json';
import AspectRatio from 'react-aspect-ratio';

import '../Squads/squads.css';
import './newsquad.css';
import { createNewSquad } from '../../store/squads';

const NewSquadForm = () => {
    const [squadName, setSquadName] = useState('');
    const [description, setDescription] = useState('');
    const [primaryType, setPrimaryType] = useState('Gaming');
    const [secondaryType, setSecondaryType] = useState('None');
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState([]);

    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (squadName && description && primaryType) setDisabled(false);
    }, [squadName, description, primaryType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nfsInformation = {
            squadName,
            description,
            primaryType,
            secondaryType,
            captainId: user.id,
        };

        const { squad } = await dispatch(createNewSquad(nfsInformation)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            }
        );
        history.push(
            `/squads/${squad.squadName
                .replaceAll(/[&\/\\#,+()$~%.'\-":*?<>{}]/g, '')
                .join('')}`
        );
    };

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
                        <div className="nsfHeaderContainer">
                            <h1 className="nsfHeader">Create Squad</h1>
                        </div>
                        <div className="captainNameWrapper">
                            <div className="captainNameContainer">
                                <div className="nsfcaptainName">
                                    <div
                                        style={{
                                            fontSize: '1.1em',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        {user.username}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '.9em',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        <i className="fas fa-crown"></i>
                                        {` Captain`}
                                    </div>
                                </div>
                            </div>
                            {errors.length > 0 && (
                                <div className="errorsContainer">
                                    <ul className="errors">
                                        {errors.map((error, idx) => (
                                            <li key={idx}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="nsfForm">
                            <div className="nsfFormInformation">
                                <div className="nsfInputContainer">
                                    <input
                                        className="nsfInput "
                                        type="text"
                                        value={squadName}
                                        onChange={(e) =>
                                            setSquadName(e.target.value)
                                        }
                                        required
                                    ></input>
                                    <span className="nsfLabel nsfSquadName">
                                        Squad Name
                                    </span>
                                </div>
                                <div className="nsfInputContainer">
                                    <select
                                        className="nsfDropdown"
                                        value={primaryType}
                                        onChange={(e) =>
                                            setPrimaryType(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="Gaming">Gaming</option>
                                        <option value="Trading">Trading</option>
                                        <option value="Social">Social</option>
                                    </select>
                                    <span className="nsfLabel">
                                        Primary Squad Type
                                    </span>
                                </div>
                                <div className="nsfInputContainer">
                                    <select
                                        className="nsfDropdown"
                                        value={secondaryType}
                                        onChange={(e) =>
                                            setSecondaryType(e.target.value)
                                        }
                                    >
                                        <option value="None">None</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Trading">Trading</option>
                                        <option value="Social">Social</option>
                                    </select>
                                    <span className="nsfLabel">
                                        Secondary Squad Type (optional)
                                    </span>
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
                                    <span className="nsfLabel nsfDescription">
                                        Description
                                    </span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={disabled}
                                style={{
                                    cursor: disabled ? 'inherit' : 'pointer',
                                }}
                                className="nsfSubmit"
                            >
                                Create
                            </button>
                        </form>
                    </div>

                    <div className="nsfPreviewWrapper">
                        <div
                            style={{ margin: '20px' }}
                            className="squadOuterContainer"
                        >
                            <div className="squadInnerContainer">
                                <div className="squadInformation">
                                    <div className="nsfPreviewHeader">
                                        <p className="preview">Preview</p>
                                    </div>
                                    <div className="squadName">
                                        <h1>
                                            {!squadName
                                                ? 'Squad Name'
                                                : squadName}
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
                                    <hr className="separator"></hr>
                                    <div className="squadInformationNav">
                                        <NavLink
                                            className="squadEventsLink"
                                            to="#"
                                        >
                                            Events
                                        </NavLink>
                                        <NavLink
                                            className="squadDescriptionLink"
                                            to="#"
                                        >
                                            Description
                                        </NavLink>
                                        <NavLink
                                            className="squadMembersLink"
                                            to="#"
                                        >
                                            Members
                                        </NavLink>
                                    </div>
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
                                                                                    maxWidth:
                                                                                        '400px',
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
