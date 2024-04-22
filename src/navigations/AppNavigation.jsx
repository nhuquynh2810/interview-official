import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import UserNavigation from './UserNavigation'
import MainNavigation from './MainNavigation'
import { useSelector } from 'react-redux'
import History from './main_screens/History'
import Home from './main_screens/Home'

const AppNavigation = () => {
    const appState = useSelector(state => state.app);
    return (
        <NavigationContainer>
            {appState.user == null ? <UserNavigation /> : <MainNavigation />}
            {/* <MainNavigation/> */}
            {/* <Home /> */}
            {/* <History/> */}
        </NavigationContainer>
    )
}

export default AppNavigation