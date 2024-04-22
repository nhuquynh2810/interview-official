import { StyleSheet, Text, Image, TouchableOpacity, View, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../redux/Reducer';
import AxiosInstance from '../../helpers/AxiosInstance';

const Details = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const { navigation } = props;

    //NAVIGATION
    const goBack = () => {
        navigation.goBack();
    }
    const goToCart = () => {
        navigation.navigate('Cart');
    }

    //THÊM GIẢM SỐ LƯỢNG
    const addQuantity = () => {
        setQuantity(quantity + 1);
    }

    const subQuantity = () => {
        quantity > 0 ? setQuantity(quantity - 1) : setQuantity(quantity);
    }

    //DATA
    //lấy id từ home truyền qua
    const _id = props?.route?.params?._id;
    const [product, setProduct] = useState({});
    //gọi api lấy thông tin sản phẩm bằng id và set lên product
    useEffect(() => {
        const getDetail = async () => {
            try {
                const result = await AxiosInstance().get(`products/getProductById_App/${_id}`);
                if (result.status) {
                    setProduct(result.data)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDetail();
        return () => { }
    }, [])

    //THÊM SẢN PHẨM VÀO CART
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);

    const add = () => {
        if (quantity >= 1) {
            const item = {
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                images: product.images,
                select: false
            }
            dispatch(addItemToCart(item));
            ToastAndroid.show('Đã thêm vào giỏ hàng!', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Vui lòng chọn số lượng!', ToastAndroid.SHORT);
        }
    }
    console.log('cart', appState.cart);

    //RENDER IMAGE
    const renderImages = () => {
        if (!product || !product.images || product.images.length === 0) {
            console.log('Không tìm thấy sản phẩm hoặc ảnh');
            return null;
        }
        return (
            <View key={selectedIndex + 1}>
                <Image
                    source={{ uri: product.images[selectedIndex] }}
                    style={styles.imageProduct}
                />
            </View>
        )
    }

    //RENDER CHẤM
    const renderDots = () => {
        if (!product || !product.images || product.images.length === 0) {
            console.log('Không tìm thấy sản phẩm hoặc ảnh');
            return null;
        }
        return product.images.map((item, index) => {
            return (
                <View key={index + 1}
                    style={{
                        marginTop: -25,
                        width: 10, height: 10,
                        borderRadius: 5,
                        backgroundColor: selectedIndex === index ? 'black' : 'gray',
                        margin: 5
                    }} />
            )
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Image style={styles.backIcon} source={require('../../../assets/images/backIcon.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>{product.name}</Text>
                <TouchableOpacity onPress={goToCart}>
                    <Image source={require('../../../assets/images/cartIcon.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.slider}>
                <PagerView style={styles.pagerView}
                    initialPage={selectedIndex}>
                    {renderImages()}
                </PagerView>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {renderDots()}
                </View>

                <TouchableOpacity style={styles.previousIcon} onPress={() => { selectedIndex == 0 ? setSelectedIndex(selectedIndex) : setSelectedIndex(selectedIndex - 1) }}>
                    <Image source={require('../../../assets/images/previousIcon.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextIcon} onPress={() => { selectedIndex + 1 <= product.images.length - 1 ? setSelectedIndex(selectedIndex + 1) : setSelectedIndex(selectedIndex); }}>
                    <Image style={styles.nextIcon} source={require('../../../assets/images/nextIcon.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.greenContaienr}>
                <Text style={styles.greenBox}>{'Cây trồng'}</Text>
                <Text style={styles.greenBox}>{'Ưa bóng'}</Text>
            </View>

            <Text style={styles.price}>{product.price}{' '}vnd</Text>

            <View style={styles.field}>
                <Text style={styles.subtitle}>Chi tiết sản phẩm</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.infoText}>Kích cỡ</Text>
                <Text style={styles.infoText}>{'Nhỏ'}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.infoText}>Xuất xứ</Text>
                <Text style={styles.infoText}>{'Châu Phi'}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.infoText}>Tình trạng</Text>
                <Text style={[styles.infoText, { color: 'green' }]}>Còn {product.quantity} sp</Text>
            </View>

            <View style={styles.quantityPriceTitle}>
                <Text style={styles.fontSize18}>Đã chọn {quantity} sản phẩm</Text>
                <Text style={styles.fontSize18}>Tạm tính</Text>
            </View>
            <View style={styles.quantityPrice}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.buttonIcon} onPress={subQuantity}>
                        <Image source={require('../../../assets/images/minusSquare.png')} />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={addQuantity}>
                        <Image source={require('../../../assets/images/plusSquare.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.total}>{quantity * product.price}{' '}vnd</Text>
                </View>
            </View>

            <TouchableOpacity style={[styles.buttonChonMua, quantity >= 1 ? { backgroundColor: 'green' } : null]} onPress={add}>
                <Text style={styles.buttonText}>CHỌN MUA</Text>
            </TouchableOpacity>

        </View >
    )
}

export default Details

const styles = StyleSheet.create({
    pagerView: {
        width: '100%',
        height: 250,
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    buttonChonMua: {
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'gray'
    },
    quantity: {
        fontSize: 23,
        color: 'black',
        marginRight: 40
    },
    buttonIcon: {
        marginLeft: 30,
        marginRight: 40
    },
    total: {
        fontSize: 26,
        color: "black",
        marginRight: 30
    },
    quantityContainer: {
        flexDirection: 'row'
    },
    quantityPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fontSize18: {
        fontSize: 18
    },
    quantityPriceTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        marginTop: 25
    },
    infoText: {
        fontSize: 20,
    },
    field: {
        paddingTop: 20,
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    subtitle: {
        fontSize: 20,
        color: 'black'
    },
    price: {
        color: 'green',
        fontSize: 25,
        marginLeft: 40,
        marginTop: 20
    },
    greenContaienr: {
        paddingLeft: 40,
        flexDirection: 'row',
        marginTop: 10,
    },
    greenBox: {
        marginTop: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 5,
    },
    nextIcon: {
        position: 'absolute',
        top: 55,
        right: 15
    },
    previousIcon: {
        position: 'absolute',
        left: 15,
        top: 110
    },
    imageProduct: {
        width: '100%',
        height: 250
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
        marginBottom: 20,
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        paddingTop: 50,
        flex: 1,
        paddingVertical: 30,
    }
})