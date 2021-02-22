import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Events = () => {
    const user = useSelector((state) => state.session.user);
    if (!user) return <Redirect to="/login" />;
    return <div>hello</div>;
};

export default Events;
