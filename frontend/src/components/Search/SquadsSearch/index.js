import { useParams } from 'react-router-dom';
import { findSquad } from '../../../store/squads';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SquadsSearch = ({ squads }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const squadId = e.target.id;
        await dispatch(findSquad(squadId));

        history.push(`/squads/${squadId}`);
    };
    return (
        <div className="resultsContainer">
            <div className="searchResultsHeader">
                <span className="searchResultsLabel">
                    Squads {squads.length > 0 && `· ${squads.length} result(s)`}
                </span>
            </div>
            <div className="searchResults">
                {squads.length > 0 ? (
                    squads.map((squad, idx) => (
                        <div key={idx} className="searchLinkContainer">
                            <a
                                id={squad.id}
                                onClick={handleClick}
                                href={`/squads/${squad.squadName
                                    .split(' ')
                                    .join('-')}`}
                            >
                                {squad.squadName}
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="searchLinkContainer">No results</div>
                )}
            </div>
        </div>
    );
};

export default SquadsSearch;
