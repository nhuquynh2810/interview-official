import { ImageBackground, Image, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, NativeAppEventEmitter } from 'react-native'
import React, { useState } from 'react'
import TextInput from '../../common/TextInput'
import LinearGradient from 'react-native-linear-gradient';
import { register } from '../../redux/UserAPI';
import { useDispatch, useSelector } from 'react-redux'
import { setUserState } from '../../redux/Reducer';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const [phoneNumber, setPhoneNumber] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errConfirmPassword, setErrorConfirmPassword] = useState('');
    // const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    const { navigation } = props
    const goToLogIn = () => {
        navigation.navigate('LogIn');
    }

    const handlerRegister = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        // const phoneNumberRegex = /^\d{10,}$/;

        !emailRegex.test(email) ? setErrorEmail('Email is in wrong format!') : setErrorEmail('')
        !passwordRegex.test(password) ? setErrorPassword('Password is in wrong format!') : setErrorPassword('')
        name == "" ? setErrorName('Name is in wrong format!') : setErrorName('')
        password == confirmPassword ? setErrorConfirmPassword('') : setErrorConfirmPassword('Confirm password is incorrect')
        // !phoneNumberRegex.test(phoneNumber) ? setErrorPhoneNumber('Phone number is in wrong format!') : setErrorPhoneNumber('')

        if (errorEmail == '' && errorPassword == '' && errConfirmPassword == '' && errorName == '') {
            try {
                const body = { email, password, name };
                dispatch(register(body));
            } catch (error) {
                console.log(error);
            }
        }
    }

6


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.imageHeader} resizeMode="cover" source={require('../../../assets/images/imageHeader.png')} />
                <View style={styles.body}>
                    <Text style={styles.title}>Đăng ký</Text>
                    <Text style={styles.subtTitle}>Tạo tài khoản</Text>
                    <TextInput placeHolder='Họ tên' onChangeText={setName} value={name} error={errorName} />
                    <TextInput placeHolder='E-mail' onChangeText={setEmail} value={email} error={errorEmail} />
                    {/* <TextInput placeHolder='Số điện thoại' onChangeText={setPhoneNumber} value={phoneNumber} error={errorPhoneNumber} /> */}
                    <TextInput eyePassword={true} placeHolder='Mật khẩu' onChangeText={setPassword} value={password} error={errorPassword} />
                    <TextInput eyePassword={true} placeHolder='Xác nhận mật khẩu' onChangeText={setConfirmPassword} value={confirmPassword} error={errConfirmPassword} />


                    <View style={styles.moreInfoContainer}>
                        <Text style={styles.info}>Để đăng ký tài khoản, bạn đồng ý <Text style={styles.colorUnderline}>Terms &</Text></Text>
                        <View style={styles.secondRow}>
                            <Text style={styles.colorUnderline}>Conditions</Text>
                            <Text style={styles.info}>{' '}and</Text>
                            <Text style={styles.colorUnderline}>{' '}Privacy Policy</Text>
                        </View>
                    </View>

                    <LinearGradient
                        colors={['#007537', '#4CAF50']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.linearGradient}
                    >
                        <TouchableOpacity style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={handlerRegister}>
                            <Text style={styles.dangNhapText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={styles.orContainer}>
                        <View style={styles.slash}></View>
                        <Text style={styles.orText}>Hoặc</Text>
                        <View style={styles.slash}></View>
                    </View>

                    <View style={styles.ggfbContainer}>
                        <Image source={require('../../../assets/images/logoGoogle.png')} style={styles.google} />
                        <Image source={require('../../../assets/images/logoFacebook.png')} style={styles.facebook} />
                    </View>

                    <Text style={styles.askText}>Tôi đã có tải khoản<Text style={styles.loginText} onPress={goToLogIn}>{'  '}Đăng nhập</Text></Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    noUnderline: {
        textDecorationLine: 'none',
    },
    colorUnderline: {
        textDecorationLine: 'underline',
        fontSize: 17,
        color: 'green',
        alignSelf: 'center'
    },
    info: {
        fontSize: 17,
        color: 'black',
        alignSelf: 'center'
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    moreInfoContainer: {
        marginVertical: 15
    },
    loginText: {
        color: 'green'
    },
    askText: {
        color: 'black',
        fontSize: 15,
        alignSelf: 'center'
    },
    google: {
        marginRight: 30
    },
    ggfbContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    slash: {
        borderBottomWidth: 1,
        borderColor: 'green',
        width: 150
    },
    orText: {
        marginHorizontal: 5,
        color: 'black',
        fontWeight: '400'
    },
    orContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dangNhapText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    linearGradient: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: 'green',
        width: '100%',
        height: 55
    },

    body: {
        padding: 20
    },
    subtTitle: {
        fontSize: 22,
        color: 'black',
        alignSelf: 'center',
        marginVertical: 10
    },
    title: {
        marginTop: -50,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 35,
        alignSelf: 'center',
    },
    imageHeader: {
        marginTop: -200,
        width: 412,
        height: 400,
    },
})
