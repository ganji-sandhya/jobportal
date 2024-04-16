import { Outlet } from "react-router";
import Navbar from "./Navbar";

const RootLayout = () => {
    return(<>
        <Navbar />
        <Outlet />
    </>);
};

export default RootLayout;