import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { userState } from '../context/UserContext';
import Loader from '../components/ui/Loader';

const ProtectedRoute = ({ children }) => {

    const [isInitialized, setIsInitialized] = useState(false);
    const { user, loading } = userState();

    useEffect(() => {
        if (!loading) {
            setIsInitialized(true);
        }
    }, [loading]);

    if (!isInitialized) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;