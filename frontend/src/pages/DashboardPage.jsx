import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);
    // console.log(user);
    return (
        <div className="dashboard">
            <h1>Welcome, {user.profile?.name}!</h1>
            {user.profile?.picture && (
                <img 
                    src={user.picture} 
                    alt="Profile" />
            )}

            <p>Email: {user.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default DashboardPage;