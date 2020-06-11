import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => (
    <Navigator>
        <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
);

export default AppRoutes;