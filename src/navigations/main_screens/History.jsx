import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/UserAPI'
const History = (props) => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);

  //DATA
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async () => {
    try {
      //lấy thông tin user mới nhất từ database vào cart của redux trước khi hiển thị
      try {
        const _id = appState.user._id
        const body = { _id };
        dispatch(getUser(body));
      } catch (error) {
        console.log(error);
      }
      setRefreshing(true);
      setHistory(appState.user.carts);
      setRefreshing(false);
      console.log('history:', appState.user.carts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, [])

  //NAVIGATION
  const { navigation } = props;
  const goBack = () => {
    navigation.goBack();
  }
  const renderItemCart = ({ item }) => {
    const { _id, name, status, images, date, quantity } = item;
    const imageLink = images && images.length > 0 ? images[0] : null;

    //Đổi từ 1711843773023 về dạng thứ ngày tháng năm
    const timestamp = date;
    const numberedDate = new Date(timestamp);

    // Lấy thông tin ngày, tháng, năm từ đối tượng Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = numberedDate.toLocaleDateString('en-US', options); // Định dạng ngày tháng năm
    return (
      <TouchableOpacity style={styles.itemContainer} key={_id}>
        {/* hiển thị ngày tháng năm */}
        <View style={{ width: '100%', borderBottomColor: '#7D7B7B', borderBottomWidth: 1, }}>
          <Text style={{ fontSize: 18, color: '#221F1F', fontWeight: '600' }}>{formattedDate}</Text>
        </View>

        <View style={styles.itemSearchStyle}>
          {/* hiển thị ảnh */}
          <Image
            style={styles.imageStyle}
            source={{ uri: imageLink }} />
          <View style={styles.containTextStyle}>
            {/* trạng thái đặt hàng */}
            {status == 1 ? <Text style={styles.nameStyle}>Đặt hàng thành công</Text> : <Text style={[styles.nameStyle, { color: 'red' }]}>Đã hủy đơn hàng</Text>}
            {/* tên sản phẩm */}
            <Text style={styles.priceStyle}>{name}</Text>
            {/* số lượng sản phẩm */}
            <Text style={styles.quantity}>{quantity} sản phẩm</Text>
          </View>
        </View>
      </TouchableOpacity>
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
        >LỊCH SỬ GIAO DỊCH</Text>
        <View style={styles.iconBackLeftStyle}>
        </View>
      </View>

      <View
        style={{
          // width: '100%',
          paddingHorizontal: 23.5,
          marginTop: 5,
          flex: 1,
        }}>
        <FlatList
          data={history}
          renderItem={renderItemCart}
          keyExtractor={item => item.id}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={fetchHistory}
        />
      </View>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  quantity: {
    fontSize: 14,
    color: '#000',
  },
  priceStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600'
  },
  nameStyle: {
    color: '#007537',
    fontSize: 18,
    fontWeight: '500',
    width: '100%',
    textAlign: 'left'
  },
  containTextStyle: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%'
  },
  imageStyle: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  itemSearchStyle: {
    width: '100%',
    height: 77,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  }
});

var products = [
  {
    "id": 1,
    "name": "Kelilna",
    "price": "$5.93",
    "image": "http://dummyimage.com/157x100.png/cc0000/ffffff",
    "character": "Antelope, four-horned"
  }, {
    "id": 2,
    "name": "Cassondra",
    "price": "$6.18",
    "image": "http://dummyimage.com/216x100.png/5fa2dd/ffffff",
    "character": "Goose, greylag"
  }, {
    "id": 3,
    "name": "Gaultiero",
    "price": "$4.85",
    "image": "http://dummyimage.com/227x100.png/dddddd/000000",
    "character": "Frilled dragon"
  }, {
    "id": 4,
    "name": "Hilarius",
    "price": "$6.30",
    "image": "http://dummyimage.com/216x100.png/ff4444/ffffff",
    "character": "Common waterbuck"
  }, {
    "id": 5,
    "name": "Harriette",
    "price": "$1.57",
    "image": "http://dummyimage.com/234x100.png/ff4444/ffffff",
    "character": "Racer snake"
  }, {
    "id": 6,
    "name": "Kasey",
    "price": "$6.75",
    "image": "http://dummyimage.com/223x100.png/5fa2dd/ffffff",
    "character": "African clawless otter"
  }, {
    "id": 7,
    "name": "Alla",
    "price": "$9.65",
    "image": "http://dummyimage.com/153x100.png/dddddd/000000",
    "character": "Brindled gnu"
  }, {
    "id": 8,
    "name": "Mada",
    "price": "$5.65",
    "image": "http://dummyimage.com/180x100.png/cc0000/ffffff",
    "character": "Barbet, crested"
  }, {
    "id": 9,
    "name": "Roana",
    "price": "$1.08",
    "image": "http://dummyimage.com/172x100.png/ff4444/ffffff",
    "character": "Armadillo, nine-banded"
  }, {
    "id": 10,
    "name": "Rosana",
    "price": "$8.16",
    "image": "http://dummyimage.com/201x100.png/cc0000/ffffff",
    "character": "Canadian tiger swallowtail butterfly"
  }
];