const SquadPage = () => {
    return (
        <div className="squadPageWrapper">
            <div className="squadPageContainer">
                <div className="squadPageHeaderContainer">
                    <p className="squadPageHeader">Squads</p>
                </div>
                <div className="squadsListContainer">
                    <div className="squadsListHeaderContainer">
                        <p className="squadType">Gaming</p>
                    </div>
                    <div className="squadsListBodyContainer"></div>
                </div>
                <div className="squadsListContainer">
                    <div className="squadsListHeaderContainer">
                        <p className="squadType">Social</p>
                    </div>
                    <div className="squadsListBodyContainer"></div>
                </div>
                <div className="squadsListContainer">
                    <div className="squadsListHeaderContainer">
                        <p className="squadType">Trading</p>
                        <div className="squadsListBodyContainer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SquadPage;
