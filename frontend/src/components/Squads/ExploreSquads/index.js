import { useHistory } from 'react-router-dom';
import { findAllSquads } from '../../../store/allSquads';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinNewSquad } from '../../../store/user';

const ExploreSquads = ({ allSquads }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userProfile = useSelector((state) => state.userProfile);

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${e.target.id}/squads`);
    };

    const handleSquadClick = (squadId) => {
        history.push(`/squads/${squadId}`);
    };

    const handleJoinSquad = async (e, squadId) => {
        e.stopPropagation();
        await dispatch(joinNewSquad(squadId, loggedInUser.id));
    };

    const { gamingSquads, tradingSquads, socialSquads } = allSquads;
    const userSquads = Object.keys(userProfile).length > 0 && [
        ...userProfile.captain,
        ...userProfile.squadmates,
    ];



    return (
        userSquads && (
            <>
                <div className="allSquadsListWrapper">
                    <div className="allSquadsListContainer">
                        <div className="allSquadsListBodyContainer">
                            <div className="exploreSquadsSquadContainer">
                                <div className="allSquadsListHeaderContainer top">
                                    <div className="allSquadsListHeader">
                                        <div className="categoryHeader">
                                            Gaming Squads
                                        </div>
                                        <i className="fas fa-gamepad categoryIcon"></i>
                                    </div>
                                    <div className="allSquadsSeeAllContainer">
                                        <span
                                            onClick={() => {
                                                history.push(
                                                    '/squads/explore/gaming'
                                                );
                                            }}
                                            className="allSquadsSeeAll"
                                        >
                                            See All
                                        </span>
                                    </div>
                                </div>

                                <div className="exploreSquadsBodyContainer">
                                    {gamingSquads.map((squad, idx) => (
                                        <div
                                            key={idx}
                                            className="allSquadsList"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleSquadClick(squad.id)
                                                }
                                                className="squadListSquadLink"
                                            >
                                                <div className="squadCardImageContainer">
                                                    <img
                                                        className="squadCardImage"
                                                        src={squad.squadImage}
                                                    ></img>
                                                </div>
                                                <div className="squadDescriptionContainer">
                                                    <div className="squadListSquadName">
                                                        {squad.squadName}
                                                    </div>
                                                    <div
                                                        to={`/users/${squad.captain.username}`}
                                                        onClick={
                                                            handleCaptainClick
                                                        }
                                                        id={
                                                            squad.captain
                                                                .username
                                                        }
                                                        className="squadListSquadCaptain"
                                                    >
                                                        {squad.captain.username}
                                                    </div>
                                                </div>
                                                {!userSquads
                                                    .map(
                                                        (userSquad) =>
                                                            userSquad.squadName
                                                    )
                                                    .includes(
                                                        squad.squadName
                                                    ) && (
                                                    <div
                                                        onClick={(e) =>
                                                            handleJoinSquad(
                                                                e,
                                                                squad.id
                                                            )
                                                        }
                                                        className="joinSquadContainer"
                                                    >
                                                        <div className="joinSquad">
                                                            Join Squad
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="exploreSquadsSquadContainer">
                                <div className="allSquadsListHeaderContainer">
                                    <div className="allSquadsListHeader">
                                        <div className="categoryHeader">
                                            Social Squads
                                        </div>
                                        <i className="fas fa-user categoryIcon"></i>
                                    </div>
                                    <div className="allSquadsSeeAllContainer">
                                        <span
                                            onClick={() =>
                                                history.push(
                                                    '/squads/explore/social'
                                                )
                                            }
                                            className="allSquadsSeeAll"
                                        >
                                            See All
                                        </span>
                                    </div>
                                </div>
                                <div className="exploreSquadsBodyContainer">
                                    {socialSquads.map((squad, idx) => (
                                        <div
                                            key={idx}
                                            className="allSquadsList"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleSquadClick(squad.id)
                                                }
                                                className="squadListSquadLink"
                                            >
                                                <div className="squadCardImageContainer">
                                                    <img
                                                        src={squad.squadImage}
                                                        className="squadCardImage"
                                                    ></img>
                                                </div>
                                                <div className="squadDescriptionContainer">
                                                    <div className="squadListSquadName">
                                                        {squad.squadName}
                                                    </div>
                                                    <div
                                                        onClick={
                                                            handleCaptainClick
                                                        }
                                                        id={
                                                            squad.captain
                                                                .username
                                                        }
                                                        className="squadListSquadCaptain"
                                                    >
                                                        {squad.captain.username}
                                                    </div>
                                                </div>
                                                {!userSquads
                                                    .map(
                                                        (userSquad) =>
                                                            userSquad.squadName
                                                    )
                                                    .includes(
                                                        squad.squadName
                                                    ) && (
                                                    <div
                                                        onClick={(e) =>
                                                            handleJoinSquad(
                                                                e,
                                                                squad.id
                                                            )
                                                        }
                                                        className="joinSquadContainer"
                                                    >
                                                        <div className="joinSquad">
                                                            Join Squad
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="exploreSquadsSquadContainer">
                                <div className="allSquadsListHeaderContainer">
                                    <div className="allSquadsListHeader">
                                        <div className="categoryHeader">
                                            Trading Squads
                                        </div>
                                        <i className="fas fa-store categoryIcon"></i>
                                    </div>
                                    <div className="allSquadsSeeAllContainer">
                                        <span
                                            onClick={() =>
                                                history.push(
                                                    '/squads/explore/trading'
                                                )
                                            }
                                            className="allSquadsSeeAll"
                                        >
                                            See All
                                        </span>
                                    </div>
                                </div>
                                <div className="exploreSquadsBodyContainer">
                                    {tradingSquads.map((squad, idx) => (
                                        <div
                                            key={idx}
                                            className="allSquadsList"
                                        >
                                            <div
                                                onClick={() =>
                                                    handleSquadClick(squad.id)
                                                }
                                                className="squadListSquadLink"
                                            >
                                                <div className="squadCardImageContainer">
                                                    <img
                                                        src={squad.squadImage}
                                                        className="squadCardImage"
                                                    ></img>
                                                </div>
                                                <div className="squadDescriptionContainer">
                                                    <div className="squadListSquadName">
                                                        {squad.squadName}
                                                    </div>
                                                    <div
                                                        onClick={
                                                            handleCaptainClick
                                                        }
                                                        id={
                                                            squad.captain
                                                                .username
                                                        }
                                                        className="squadListSquadCaptain"
                                                    >
                                                        {squad.captain.username}
                                                    </div>
                                                </div>
                                                {!userSquads
                                                    .map(
                                                        (userSquad) =>
                                                            userSquad.squadName
                                                    )
                                                    .includes(
                                                        squad.squadName
                                                    ) && (
                                                    <div
                                                        onClick={(e) =>
                                                            handleJoinSquad(
                                                                e,
                                                                squad.id
                                                            )
                                                        }
                                                        className="joinSquadContainer"
                                                    >
                                                        <div className="joinSquad">
                                                            Join Squad
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default ExploreSquads;
