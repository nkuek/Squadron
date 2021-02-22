import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Event = () => {
    const user = useSelector((state) => state.session.user);
    if (!user) return <Redirect to="/login" />;
    return <div></div>;
};

export default Event;
