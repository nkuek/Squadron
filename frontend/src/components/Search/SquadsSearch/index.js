import { useParams } from 'react-router-dom';
const SquadsSearch = ({ squads }) => {
    const handleClick = (e) => {
        e.preventDefault();
        // const squadName = e.target.id;
        // const squadState = await dispatch(findUser(username));

        // localStorage.setItem('user', JSON.stringify(userState));
        // history.push(`/users/${username}`)
    };
    return null;
    // return (
    //     <div className="resultsContainer">
    //         <div className="searchResultsHeader">
    //             <span className="searchResultsLabel">
    //                 Squads {squads.length > 0 && `· ${squads.length} result(s)`}
    //             </span>
    //         </div>
    //         <div className="searchResults">
    //             {squads.length > 0 ? (
    //                 squads.map((squad, idx) => (
    //                     <div key={idx} className="searchLinkContainer">
    //                         <a
    //                             id={squad.squadName}
    //                             onClick={handleClick}
    //                             href={`/squads/${squad.squadName
    //                                 .split(' ')
    //                                 .join('-')}`}
    //                         >
    //                             {squad.squadName}
    //                         </a>
    //                     </div>
    //                 ))
    //             ) : (
    //                 <div className="searchLinkContainer">No results</div>
    //             )}
    //         </div>
    //     </div>
    // );
};

export default SquadsSearch;
