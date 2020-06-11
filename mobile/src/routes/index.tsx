import React, { useContext } from 'react';
import { View, ActivityIndicator, ActivityIndicatorBase } from 'react-native';

import { useAuth } from '../contexts/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const routes: React.FC = () => {
    const { signed, loading } = useAuth();

    if(loading){
        return (
            <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#999" />
            </View>
        );
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default routes;