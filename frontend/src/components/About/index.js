import './about.css';
const About = () => {
    return (
        <div className="aboutPageWrapper">
            <div className="aboutPage">
                <h1 className="aboutHeader fade-in">Nick Kuek</h1>
                <p className="aboutSubheader fade-in">
                    Full Stack Developer • App Academy Student • Software
                    Developer
                </p>
                <div className="socialsContainer fade-in">
                    <a
                        href="http://github.com/nkuek"
                        className="github fade-in"
                    >
                        <i className="fab fa-github fa-3x"></i>
                    </a>
                    <a href="mailto:nkuek1@gmail.com" className="email fade-in">
                        <i className="fas fa-envelope fa-3x"></i>
                    </a>
                    <a
                        href="www.linkedin.com/in/nick-kuek"
                        className="linkedin fade-in"
                    >
                        <i className="fab fa-linkedin fa-3x"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
