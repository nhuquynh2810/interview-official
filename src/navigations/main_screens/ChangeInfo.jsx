import { StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import InputUnderlined from '../../common/InputUnderlined'
import { useDispatch, useSelector } from 'react-redux'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { editAvatar } from '../../redux/Reducer';
import { updateAccount } from '../../redux/UserAPI';
import { getUser } from '../../redux/UserAPI';
import axios from 'axios';

const ChangeInfo = (props) => {
    //DATA
    const appState = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const user = appState.user;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [address, setAddress] = useState(user.address);
    const [error, setError] = useState('');

    const updateHandler = async () => {
        try {
            //Kiểm tra thông tin nhập
            if (name == '' || phoneNumber == '' || address == '') {
                setError('Vui lòng điền đầy đủ thông tin!')
                throw new Error('Chưa đủ thông tin')
            } else {
                setError('')
            }
            const phoneNumberRegex = /^\d{10,}$/;
            if (!phoneNumberRegex.test(phoneNumber)) {
                setError('Số điện thoại không đúng định dạng')
                throw new Error('Số điện thoại không đúng định dạng')
            }
            else {
                setError('')
            }
            let linkAvatar = null;

            try {
                const source = {
                    uri: appState.user.avatar,
                    type: 'image/jpeg',
                    name: 'hehe'
                }

                const data = new FormData();
                // data.append('file', {
                //     fileName: response.assets[0].fileName,
                //     name: response.assets[0].fileName,
                //     type: response.assets[0].type,
                //     uri: response.assets[0].uri,
                // });
                data.append('file', source);
                console.log('ảnh máy: ', source);
                data.append('upload_preset', 'ml_default');
                data.append('cloud_name', 'ddnu25ofk');

                const result = await fetch('https://api.cloudinary.com/v1_1/ddnu25ofk/image/upload', {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    }
                });

                const response = await result.json();
                linkAvatar = response.url

                // axios({
                //     url: 'https://api.cloudinary.com/v1_1/ddnu25ofk/image/upload',
                //     method: 'POST',
                //     data: data,
                //     headers: {
                //         Accept: 'application/json',
                //         'Content-Type': 'multipart/form-data',
                //         'Authorization': ' '
                //     }
                // })
                //     .then(function (response) {
                //         console.log("ket qua tra ve :", response.data);
                //         linkAvatar = response.data.url;
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     })


            } catch (error) {
                console.log(error)
            }
            console.log(linkAvatar)
            const _id = user._id;
            const body = {
                id: _id,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                avatar: linkAvatar
            };
            await dispatch(updateAccount(body));

            //cập nhập thông tin user mới nhất
            try {
                const _id = appState.user._id
                const body = { _id };
                dispatch(getUser(body));
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }


    //TAKE PHOTO

    const options = {
        mediaType: 'photo',
        quality: 1,
        cameraType: 'back',
        saveToPhotos: true,
    }

    const libraryOptions = {
        selectionLimit: 10,
        ...options,
    }

    const takePhoto = () => {
        try {
            launchCamera(options, async (response) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                }
                else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                }
                else {
                    console.log('response', response);
                    // hiện ảnh vừa chụp lên giao diện
                    const uri = response.assets[0].uri
                    dispatch(editAvatar(uri))
                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const onOpenLibrary = async (response) => {
        response = ImagePickerResponse = await launchImageLibrary(
            libraryOptions,
        );
        if (response?.assets) {
            const uri = response.assets[0].uri
            dispatch(editAvatar(uri))
            console.log(response.assets[0].uri);
        } else {
            Alert.alert('Có lỗi xảy ra: ', response.errorMessage);
        }
    }

    //NAVIGATION
    const { navigation } = props;
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={goBack}>
                            <Image style={styles.backIcon} source={require('../../../assets/images/backIcon.png')} />
                        </TouchableOpacity>
                        <Text style={styles.title}>CHỈNH SỬA THÔNG TIN</Text>
                        <View></View>
                    </View>

                    <View style={styles.images}>
                        <TouchableOpacity onPress={takePhoto}>
                            <Image
                                source={{ uri: appState.user.avatar }}
                                style={styles.avatar}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onOpenLibrary}>
                            <Image style={{ marginTop: 120 }} source={require('../../../assets/images/editImage.png')} />
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.guide}>Thông tin sẽ được lưu do lần mua kế tiếp.{'\n'}Bấm vào thông tin chi tiết để chỉnh sửa</Text>
                    <InputUnderlined onChangeText={setName} value={name} />
                    <InputUnderlined editable={false} onChangeText={setEmail} value={email} />
                    <InputUnderlined onChangeText={setPhoneNumber} placeholder='Thêm số điện thoại' value={phoneNumber} />
                    <InputUnderlined onChangeText={setAddress} placeholder='Thêm số địa chỉ' value={address} />
                    <Text style={styles.error}>{error}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonSave} onPress={updateHandler} >
                            <Text style={styles.buttonText} >LƯU THÔNG TIN</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default ChangeInfo

const styles = StyleSheet.create({
    error: {
        marginTop: 10,
        color: 'red',
        fontWeight: '600',
        fontSize: 18
    },
    images: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 70
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    buttonSave: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#7D7B7B',
        borderRadius: 10,
    },
    guide: {
        color: 'black',
        marginTop: 50,
        fontSize: 17,
        marginBottom: 40
    },
    backIcon: {
        marginLeft: -20
    },
    avatar: {
        marginTop: 40,
        width: 100,
        borderRadius: 10,
        height: 100,
        alignSelf: 'center'
    },
    title: {
        alignSelf: 'center',
        color: 'black',
        fontWeight: '500',
        fontSize: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        paddingTop: 50,
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 30,
    }
})