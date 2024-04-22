import { ImageBackground, Image, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useContext } from 'react'
import TextInput from '../../common/TextInput';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/UserAPI';
const LogIn = (props) => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigation } = props;
    const [error, setError] = useState('');
    const [saveAccount, setSaveAccount] = useState(false);
    const [saveAccountImage, setSaveAccountImage] = useState(require('../../../assets/images/tickIcon.png'));

    const saveAccountState = () => {
        setSaveAccount(!saveAccount);
        if (saveAccount) {
            setSaveAccountImage(require('../../../assets/images/tickIcon.png'));
        } else {
            setSaveAccountImage(require('../../../assets/images/checked.png'));
        }
    }


    const goToSignUp = () => {
        navigation.navigate('SignUp');
    }

    const loginButton = async () => {
        //kiểm tra tài khoản
        try {
            const body = { email, password };
            await dispatch(login(body));
        } catch (error) {
            console.log(error);
        }

        //Thông báo đăng nhập thất bại
        if (appState.user == null) {
            setError('Email or password is incorrect!')
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    barStyle="dark-content"
                    translucent
                    backgroundColor={'transparent'}>
                </StatusBar>
                <Image style={styles.imageHeader} resizeMode="cover" source={require('../../../assets/images/imageHeader.png')} />
                <View style={styles.body}>
                    <Text style={styles.title}>Chào mừng bạn </Text>
                    <Text style={styles.subtTitle}>Đăng nhập tài khoản</Text>
                    <TextInput placeHolder='Nhập email hoặc số điện thoại' onChangeText={setEmail} value={email} />
                    <TextInput placeHolder='Mật khẩu' eyePassword={true} onChangeText={setPassword} value={password} error={error} />

                    <View style={styles.rememberForgot}>
                        <View style={styles.rememberAccount}>
                            <TouchableOpacity onPress={saveAccountState}>
                                <Image source={saveAccountImage} />
                            </TouchableOpacity>
                            <Text style={styles.rememberAccountText}>Nhớ tài khoản</Text>
                        </View>
                        <View style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </View>
                    </View>

                    <LinearGradient
                        colors={['#007537', '#4CAF50']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.linearGradient}
                    >
                        <TouchableOpacity style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={loginButton}>
                            <Text style={styles.dangNhapText}>Đăng nhập</Text>
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

                    <Text style={styles.askText}>Bạn không có tải khoản<Text style={styles.createAccount} onPress={goToSignUp}>{'   '}Tạo tài khoản</Text></Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default LogIn

const styles = StyleSheet.create({
    createAccount: {
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
        marginVertical: 40,
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
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: '100%',
        height: 55
    },
    forgotPasswordText: {
        color: '#009245',
        fontWeight: 'bold'
    },
    rememberAccountText: {
        marginLeft: 10
    },
    rememberAccount: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rememberForgot: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        fontWeight: 'bold',
        color: 'black',
        fontSize: 35,
        alignSelf: 'center'
    },
    imageHeader: {
        marginTop: -150,
        width: 412,
        height: 400
    },
})
