import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { findUser } from '../../../store/user';

const UsersSearch = () => {
    const history = useHistory();
    const dispatch = useDispatch();


    const handleClick = async (e) => {
        e.preventDefault();
        const username = e.target.id;
        const userState = await dispatch(findUser(username));

        localStorage.setItem('user', JSON.stringify(userState));
        history.push(`/users/${username}`);
    };
    return <ul className="usersList">{

    }</ul>;
};

export default UsersSearch;
