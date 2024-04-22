import { ImageBackground, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const AfterPayment = (props) => {
    const navigation = props.navigation;
    const goToHome = () => {
        navigation.navigate('Home')
    }
    const goToManual = () => {
        navigation.navigate('Manual')
    }
    return (
        <ImageBackground style={styles.container} source={require('../../../assets/images/pay.jpg')}>
            <Text style={styles.text}>Chúc mừng</Text>
            <Text style={[styles.text, { fontSize: 21, marginBottom: 20 }]}>Bạn đã đặt hàng thành công!</Text>
            <TouchableOpacity onPress={goToHome} style={[styles.button, { backgroundColor: 'white', borderColor: '#009245', borderWidth: 2 }]}>
                <Text style={[styles.buttonText, { color: '#009245' }]}>Trở về Trang Chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goToManual}>
                <Text style={styles.buttonText}>Xem cẩm nang trồng cây</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default AfterPayment

const styles = StyleSheet.create({
    text: {
        color: '#009245',
        fontWeight: 'bold',
        fontSize: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    button: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#009245',
        padding: 10
    }
})