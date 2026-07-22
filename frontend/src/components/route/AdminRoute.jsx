import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import Title from "../Title";

const AdminRoute = ({children}) => {
    // eslint-disable-next-line no-unused-vars
    const {user, loading, isAdmin} = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }


    if (!isAdmin()) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Title title="Acces Denied" desc="Admin Privileges Required" align="text-center"></Title>
            </div>
        )
    }

    return children;
}

export default AdminRoute;