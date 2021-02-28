const GamingSquads = ({ gamingSquads }) => {
    console.log(gamingSquads);
    return (
        <div className="allSquadsListContainer">
            <div className="allSquadsListBodyContainer">
                {gamingSquads.map((squad) => (
                    <div className="allSquadaList">
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
    );
};

export default GamingSquads;
