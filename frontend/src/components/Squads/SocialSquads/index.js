import { useHistory, NavLink } from 'react-router-dom';
const SocialSquads = ({ socialSquads }) => {
    const history = useHistory();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${e.target.id}`);
    };

    const handleSquadClick = (e) => {
        history.push(`/squads/${e.target.id}`);
    };
    return !loggedInUser ? (
        'Log in to view your squads!'
    ) : !socialSquads ? (
        'You have not joined any gaming squads'
    ) : (
        <>
            {socialSquads.map((socialSquads) => {
                <NavLink to={`/squads/${socialSquads.id}`}>
                    {socialSquads.squadName}
                </NavLink>;
            })}
        </>
    );
};

export default SocialSquads;
