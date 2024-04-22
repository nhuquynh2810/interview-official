import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Welcome from './user_screens/Welcome';
import LogIn from './user_screens/LogIn';
import SignUp from './user_screens/SignUp';
import { useSelector } from 'react-redux'
const UserNavigation = () => {
    const appState = useSelector((state) => state.app);
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {appState.welcomeState == true &&
                <Stack.Screen name="Welcome" component={Welcome} />}
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}

export default UserNavigation