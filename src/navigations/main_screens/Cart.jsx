import { FlatList, Image, Modal, Pressable, StatusBar, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editItem, removeItem, selectCart, removeAllCart } from '../../redux/Reducer'
const Cart = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  //DỮ LIỆU
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);

  //TÍCH CHỌN
  const clickItem = (_id) => {
    dispatch(selectCart(_id))
  }

  //TỔNG TIỀN
  const cartData = appState.cart;
  //tìm các item được tính chọn để tính tổng tiền
  const selectedCart = cartData.filter((item) => item.select == true);

  const [total, setTotal] = useState(0);
  //mỗi lần mảng các item được tick chọn thay đổi thì tính lại tổng tiền
  useEffect(() => {
    let sum = 0;
    selectedCart.forEach(item => {
      sum += item.price * item.quantity;
    });
    setTotal(sum);
  }, [selectedCart]);


  //NAVIGATION
  const { navigation } = props;
  const goBack = () => {
    navigation.goBack();
  }

  const goToPayment = () => {
    if (total > 0) {
      navigation.navigate('Payment', { total: total })
    } else {
      ToastAndroid.show('Vui lòng chọn sản phẩm!', ToastAndroid.SHORT);
    }
  }

  //RENDER ITEM
  const renderItemCart = ({ item }) => {
    const { _id, name, price, images, quantity, select } = item;
    //kiểm tra images nếu có lấy đường dẫn ảnh đầu tiên của mảng images hiển thị lên
    const imageLink = images && images.length > 0 ? images[0] : null;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} key={_id}>
        <View style={{ position: 'relative', width: 45, }}>
          <TouchableOpacity onPress={() => clickItem(_id)}>
            <Image
              style={styles.checkbox}
              source={select ? require('../../../assets/images/checkCart.png') : require('../../../assets/images/uncheck.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.itemSearchStyle}>
          <Image
            style={styles.imageStyle}
            source={{ uri: imageLink }} />
          <View style={styles.containTextStyle}>
            <Text
              numberOfLines={1}
              style={styles.nameStyle}>{name}</Text>
            <Text style={styles.priceStyle}>{price} vnd</Text>
            <View style={styles.containPlusMinus}>
              <TouchableOpacity onPress={() => dispatch(editItem({ _id: _id, quantity: -1 }))}>
                <Image
                  style={styles.minus}
                  source={require('../../../assets/images/minusSquare.png')}
                />
              </TouchableOpacity>
              <Text style={{ width: 50, textAlign: 'center', fontSize: 14, color: '#000' }}>{quantity}</Text>
              <TouchableOpacity onPress={() => dispatch(editItem({ _id: _id, quantity: 1 }))}>
                <Image
                  style={styles.plus}
                  source={require('../../../assets/images/plusSquare.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(removeItem(_id))}>
                <Text style={{ marginLeft: 50, fontSize: 16, color: '#000' }}>Xóa</Text>
                <View style={{ borderTopColor: '#000', borderTopWidth: 1, marginLeft: 50 }}></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}>
      </StatusBar>
      <View style={styles.containHeaderStyle}>
        <TouchableOpacity onPress={goBack}>
          <Image
            style={styles.iconBackLeftStyle}
            source={require('../../../assets/images/backIcon.png')} />
        </TouchableOpacity>
        <Text
          style={styles.nameOfPlantStyle}
        >GIỎ HÀNG</Text>
        <TouchableOpacity
          onPress={() => appState.cart.length != 0 ? setModalVisible(true) : setModalVisible(false)}
        >
          <Image
            style={styles.iconBackLeftStyle}
            source={require('../../../assets/images/deleteIcon.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          // width: '100%',
          paddingHorizontal: 23.5,
          marginTop: 5,
          flex: 1,
        }}>
        <FlatList
          data={appState.cart}
          renderItem={renderItemCart}
          keyExtractor={item => item.id}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.containFooterStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: '#000', }}>Tạm tính</Text>
          <Text style={{ fontSize: 20, color: '#000', }}>{total}{' '}vnd</Text>
        </View>
        <TouchableOpacity style={styles.btnPay} onPress={goToPayment}>
          <Text style={{ color: '#fff', fontSize: 18, }}>Tiến hành thanh toán</Text>
          <Image
            source={require('../../../assets/images/rightIcon.png')}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Xác nhận xóa đơn hàng?</Text>
            <Text style={[styles.modalText, { fontSize: 16, fontWeight: '400' }]}>Thao tác này sẽ không thể khôi phục</Text>
            <Pressable
              style={styles.button}
              onPress={() => { setModalVisible(!modalVisible), dispatch(removeAllCart()) }}>
              <Text style={styles.textStyle}>Đồng ý</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, { color: 'black' }]}>Hủy bỏ</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginBottom: 10,
    borderRadius: 5,
    width: 270,
    backgroundColor: 'green',
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },


  containPlusMinus: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  },
  btnPay: {
    backgroundColor: '#007537',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50, alignItems: 'center',
    marginTop: 10,
  },
  containFooterStyle: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  plus: {
    width: 20,
    height: 20,
  },
  minus: {
    width: 20,
    height: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 45

  },
  quantityStyle: {
    color: '#000',
    fontSize: 14,
  },
  priceStyle: {
    fontSize: 16,
    color: '#007537'
  },
  nameStyle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    textAlign: 'left'
  },
  containTextStyle: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  imageStyle: {
    width: 77,
    height: 77,
    borderRadius: 8,
  },
  itemSearchStyle: {
    width: '100%',
    height: 77,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameOfPlantStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },
  iconBackLeftStyle: {
    width: 24,
    height: 24,
  },
  containHeaderStyle: {
    width: '100%',
    // backgroundColor: 'red',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 15,
    marginTop: 44,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  }
})
