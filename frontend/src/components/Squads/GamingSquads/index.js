const GamingSquads = ({ gamingSquads }) => {
    return (
        <div>
            <div className="squadsListContainer">
                <div className="squadsListBodyContainer">
                    {gamingSquads.map((squad) => (
                        <div className="squadList">
                            <div className="squadListSquadName">
                                {squad.squadName}
                            </div>
                            <div className="squadListSquadCaptain">
                                {squad.captain.username}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamingSquads;
