import './about.css';
const About = () => {
    return (
        <div className="aboutPageWrapper">
            <div className="aboutPage">
                <h1 className="aboutHeader">Nick Kuek</h1>
                <p className="aboutSubheader">
                    Full Stack Developer • App Academy Student • Software
                    Developer
                </p>
                <div className="socialsContainer">
                    <a href="http://github.com/nkuek">
                        <i className="fab fa-github fa-3x"></i>
                    </a>
                    <a href="mailto:nkuek1@gmail.com">
                        <i className="fas fa-envelope fa-3x"></i>
                    </a>
                    <a href="www.linkedin.com/in/nick-kuek">
                        <i className="fab fa-linkedin fa-3x"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
