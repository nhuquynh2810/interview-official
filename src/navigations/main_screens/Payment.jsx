import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputUnderlined from '../../common/InputUnderlined'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCartTable } from '../../redux/CartAPI'
import { purchasedItem } from '../../redux/Reducer'

const Payment = (props) => {
    //DỮ LIỆU
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const user = appState.user;

    //LẤY TỔNG TIỀN TỪ CART
    const total = props?.route?.params?.total;

    //NAVIGATION
    const { navigation } = props;
    const goBack = () => {
        navigation.goBack();
    }
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const [address, setAddress] = useState(user.address)
    const [error, setError] = useState(null)
    const goToAfterPayment = () => {
        //Bắt lỗi số điện thoại và địa chỉ
        if (phoneNumber == '' || address == '') {
            setError('Vui lòng nhập số điện thoại và địa chỉ')
            return null;
        }
        const phoneNumberRegex = /^\d{10,}$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            setError('Số điện thoại không đúng định dạng')
            return null;
        }
        //Thêm các sản phẩm đã thanh toán vào bảng cart trong mongo bằng api
        try {
            //Tạo body gồm id user, và các item trong mảng cart của redux có select bằng là true
            const user = appState.user._id
            var purchasedProducts = appState.cart.filter((item) => item.select == true);
            var products = purchasedProducts.map(product => ({
                _id: product._id,
                quantity: product.quantity
            }));
            const body = { user, products };
            dispatch(addItemToCartTable(body));

            //Xóa item đã mua ra khỏi cart
            dispatch(purchasedItem());
        } catch (error) {
            console.log(error);
        }
        //Chuyển sang AfterPayment
        navigation.navigate('Home')
    }

    const [deliveryMethod, setDeliveryMethod] = useState(1);
    const [payMethod, setPayMethod] = useState(1);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Image style={styles.backIcon} source={require('../../../assets/images/backIcon.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>THANH TOÁN</Text>
                <View></View>
            </View>

            <View>
                <Text style={[styles.textUnderlined, { color: 'black', fontWeight: 'bold', marginBottom: 5 }]}>Thông tin khách hàng</Text>
                <InputUnderlined editable={false} value={user.name} />
                <InputUnderlined editable={false} value={user.email} />
                <InputUnderlined placeholder={'Nhập số điện thoại'} value={phoneNumber} onChangeText={setPhoneNumber} />
                <InputUnderlined placeholder={'Nhập địa chỉ'} value={address} onChangeText={setAddress} />
                {
                    error &&
                    <Text style={styles.error}>{error}</Text>
                }
            </View>

            <View style={{ marginTop: 30 }}>
                <Text style={[styles.textUnderlined, { color: 'black', fontWeight: 'bold' }]}>Phương thức vận chuyển</Text>
                <TouchableOpacity onPress={() => setDeliveryMethod(1)}>
                    <Text style={[styles.giaoHang, deliveryMethod == 1 ? { color: 'green' } : { color: 'black' }]}>Giao hàng Nhanh - 15.000đ</Text>
                    <Text style={styles.textUnderlined}>Dự kiến giao hàng 5-7/9</Text>
                    {deliveryMethod == 1 && <Image style={styles.checkIcon} source={require('../../../assets/images/check.png')} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDeliveryMethod(2)}>
                    <Text style={[styles.giaoHang, deliveryMethod == 2 ? { color: 'green' } : { color: 'black' }]}>Giao hàng C0D - 20.000đ</Text>
                    <Text style={styles.textUnderlined}>Dự kiến giao hàng 4-8/9</Text>
                    {deliveryMethod == 2 && <Image style={styles.checkIcon} source={require('../../../assets/images/check.png')} />}
                </TouchableOpacity>

                <View style={{ marginTop: 20 }}>
                    <Text style={[styles.textUnderlined, { color: 'black', fontWeight: 'bold' }]}>Hình thức thanh toán</Text>
                    <TouchableOpacity onPress={() => setPayMethod(1)}>
                        <Text style={[styles.textUnderlined, payMethod == 1 ? { color: 'green' } : { color: 'black' }]}>Thẻ VISA/MASTERCARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPayMethod(2)}>
                        <Text style={[styles.textUnderlined, payMethod == 2 ? { color: 'green' } : { color: 'black' }]}>Thẻ ATM</Text>
                    </TouchableOpacity>
                </View>


                <View>
                    <View style={styles.boxBottom}>
                        <Text style={styles.subtitle}>Tạm tính</Text>
                        <Text style={[styles.subtitle, { color: 'black' }]}>{total} {""}vnd</Text>
                    </View>
                    <View style={styles.boxBottom}>
                        <Text style={styles.subtitle}>Phí vận chuyển</Text>
                        <Text style={[styles.subtitle, { color: 'black' }]}>{deliveryMethod == 1 ? '15' : '20'} {""}vnd</Text>
                    </View>
                    <View style={styles.boxBottom}>
                        <Text style={styles.subtitle}>Tổng cộng</Text>
                        <Text style={[styles.subtitle, { color: 'green', fontWeight: 'bold' }]}>{total + (deliveryMethod == 1 ? 15 : 20)} {""}vnd</Text>

                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={goToAfterPayment} >
                    <Text style={styles.buttonText} >THANH TOÁN</Text>
                </TouchableOpacity>

            </View>




        </View >
    )
}

export default Payment

const styles = StyleSheet.create({
    error: {
        fontWeight: '600',
        fontSize: 18,
        color: 'red',
        marginBottom: -10
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    button: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'green',
        borderRadius: 10,
    },
    subtitle: {
        fontSize: 17
    },
    boxBottom: {
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textUnderlined: {
        fontSize: 18,
        color: 'black',
        borderWidth: 0,
        borderBottomColor: 'gray',
        paddingBottom: 5,
        borderBottomWidth: 1,
        marginBottom: 12
    },
    checkIcon: {
        position: 'absolute',
        right: 10,
        top: 12
    },
    giaoHangCheck: {
        color: 'green',
        fontWeight: '400',
        fontSize: 18
    },
    giaoHang: {
        color: 'black',
        fontWeight: '400',
        fontSize: 18
    },
    backIcon: {
        marginLeft: -20
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
        alignItems: 'center',
        marginBottom: 25
    },
    container: {
        paddingTop: 50,
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 30,
    }
})