import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Event = () => {
    const user = useSelector((state) => state.session.user);
    if (!user) return <Redirect to="/login" />;
    return (
        <div>
            <h1 style={{ color: 'white' }}>Hello from events!</h1>
        </div>
    );
};

export default Event;
