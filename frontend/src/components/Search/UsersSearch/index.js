import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { findUser } from '../../../store/user';

const UsersSearch = ({ users }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const username = e.target.id;
        const userState = await dispatch(findUser(username));

        localStorage.setItem('user', JSON.stringify(userState));
        history.push(`/users/${username}`);
    };
    return (
        <div
            className="resultsContainer"
            style={{ width: '80%', margin: '0px 20px' }}
        >
            <div className="searchResultsHeader">
                <div className="searchResultsLabel">
                    <span>
                        Users{' '}
                        {users.length > 0 && `· ${users.length} result(s)`}
                    </span>
                </div>
            </div>
            <div className="searchResults">
                {users.length > 0 ? (
                    users.map((user, idx) => (
                        <div key={idx} className="searchLinkContainer">
                            <a
                                id={user.username}
                                onClick={handleClick}
                                key={idx}
                                href={`/users/${user.username}`}
                            >
                                {user.username}
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

export default UsersSearch;
