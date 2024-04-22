import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Notification = () => {
  return (
    <ImageBackground style={styles.container} source={require('../../../assets/images/bg_wellcome.jpg')}>
      <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor={'transparent'}>
            </StatusBar>
      <Text style={styles.text}>Thông báo</Text>
    </ImageBackground>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '500',
    marginTop: 60,
  }
})