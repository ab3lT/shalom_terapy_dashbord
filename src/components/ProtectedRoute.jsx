import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, role: userRole } = useAuthStore();

    if (!isAuthenticated) return <Navigate to="/login" />;
    // if (role && userRole !== role) return <Navigate to="/unauthorized" />;
    return children;
};

export default ProtectedRoute;