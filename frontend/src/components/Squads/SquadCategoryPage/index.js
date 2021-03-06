const SquadCategoryPage = ({ squadCategory }) => {
    return (
        <div className="squadCategoryWrapper">
            <div className="squadCategoryContainer">
                <div className="squadCategoryHeaderContainer">
                    <div className="squadCategoryHeader">{squadCategory}</div>
                </div>
            </div>
        </div>
    );
};

export default SquadCategoryPage;
