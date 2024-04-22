import React from 'react'
import { Image } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import Home from './main_screens/Home';
import Profile from './main_screens/Profile';
import Search from './main_screens/Search';
import Notification from './main_screens/Notification';

import ChangeInfo from './main_screens/ChangeInfo';
import Details from './main_screens/Details';
import History from './main_screens/History';
import ListProduct from './main_screens/ListProduct';
import Payment from './main_screens/Payment';
import Cart from './main_screens/Cart';
import AfterPayment from './main_screens/AfterPayment';
import Manual from './main_screens/Manual';

const tabBarIcon = ({ focused, route }) => {
    if (route.name == 'Home') {
        return focused ?
            <Image source={require('../../assets/images/homeIconDot.png')}
                style={{ width: 25, height: 35 }} /> :
            <Image source={require('../../assets/images/homeIcon.png')}
                style={{ width: 20, height: 25 }} />
    } else if (route.name == 'Search') {
        return focused ?
            <Image source={require('../../assets/images/searchIconDot.png')}
                style={{ width: 25, height: 35 }} /> :
            <Image source={require('../../assets/images/searchIcon.png')}
                style={{ width: 20, height: 25 }} />
    } else if (route.name == 'Notification') {
        return focused ?
            <Image source={require('../../assets/images/bellIconDot.png')}
                style={{ width: 25, height: 35 }} /> :
            <Image source={require('../../assets/images/bellIcon.png')}
                style={{ width: 20, height: 25 }} />
    } else if (route.name == 'Profile') {
        return focused ?
            <Image source={require('../../assets/images/profileIconDot.png')}
                style={{ width: 25, height: 35 }} /> :
            <Image source={require('../../assets/images/profileIcon.png')}
                style={{ width: 20, height: 25 }} />
    }
}

const tabScreenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused }) => tabBarIcon({ route, focused }),
    tabBarLabel: () => null,
});

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={tabScreenOptions}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Notification" component={Notification} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

const MainNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Manual" component={Manual} />
            <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="ListProduct" component={ListProduct} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="AfterPayment" component={AfterPayment} />
        </Stack.Navigator>
    )
}

export default MainNavigation
