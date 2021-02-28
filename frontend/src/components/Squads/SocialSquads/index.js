import { useHistory } from 'react-router-dom';
const SocialSquads = ({ socialSquads }) => {
    const history = useHistory();

    const handleCaptainClick = (e) => {
        e.stopPropagation();
        history.push(`/users/${e.target.id}`);
    };

    const handleSquadClick = (e) => {
        history.push(`/squads/${e.target.id}`);
    };
    return null;
};

export default SocialSquads;
