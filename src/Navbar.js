import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar is-background-rounded tppattern" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <img src="Sprite-0002.png" style={{height: 90}}></img>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item is-size-4 has-text-info has-text-weight-semibold">
                        Devices
                    </Link>
                    <Link to="/register" className="navbar-item is-size-4 has-text-info has-text-weight-semibold">
                        Register
                    </Link>
                    <Link to="/record" className="navbar-item is-size-4 has-text-info has-text-weight-semibold">
                        Record
                    </Link>
                    <Link to="/settings" className="navbar-item is-size-4 has-text-info has-text-weight-semibold">
                        Settings
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;