import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (<nav>
        <div className="nav-header"><h1 className="nav-heading">Job Portal</h1></div>
        <div className="button-container">
        <NavLink to="/" className={({isActive}) => (isActive ? "active": "inactive")}><button className="btn">Home</button></NavLink>
        <NavLink to="/candidate/registration" className={({isActive}) =>  (isActive ? "active": "inactive")}><button className="btn">Register Candidate</button></NavLink>
        <NavLink to="/candidate/list" className={({isActive}) => (isActive ? "active": "inactive")}><button className="btn">List Candidates</button></NavLink>
        </div>
    </nav>);
}

export default Navbar;