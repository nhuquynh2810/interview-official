import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Welcome = (props) => {
    const { navigation } = props
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LogIn')
        }, 2000)
    })
    return (
        // <View style={{ flex: 1 }}>
        //     <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
        <ImageBackground style={{ flex: 1 }} source={require('../../../assets/images/bg_wellcome.jpg')}>
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor={'transparent'}>
            </StatusBar>

        </ImageBackground>
        /* </View> */
    )
}

export default Welcome

const styles = StyleSheet.create({})