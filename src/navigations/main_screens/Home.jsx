import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { displayWelcome } from '../../redux/Reducer';
import AxiosInstance from '../../helpers/AxiosInstance';

//Sửa lại đường dẫn products của api và ở đây
//đăng ký sang đăng nhập

const Home = (props) => {
  //SET TRẠNG THÁI WELCOME
  //khi đã vào được home thì đăng xuất không trở lại welcome nữa
  const dispatch = useDispatch();
  dispatch(displayWelcome());

  //DATA
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const response = await AxiosInstance().get("/products/getProducts_App");
      setProducts(response.data);
      //Loại bỏ các sản phẩm products có số lượng bằng 0
      const filteredProducts = response.data.filter(item => item.quantity > 0);
      setProducts(filteredProducts);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  // NAVIGATION
  const { navigation } = props;

  const goToDetail = (_id) => {
    navigation.navigate('Details', { _id: _id })
  }

  const goToListProduct = () => {
    navigation.navigate('ListProduct', { products: products });
  }
  const goToCart = () => {
    navigation.navigate('Cart');
  }


  //RENDER ITEM
  const renderItemPlant = ({ item }) => {
    const { _id, name, price, images, description } = item;
    const imageLink = images && images.length > 0 ? images[0] : null;
    return (
      <TouchableOpacity onPress={() => goToDetail(_id)}>
        <View style={getItemContainer()}>

          <View style={getContainImgProducts()}>
            <Image
              style={getImgProductStyle()}
              source={{ uri: imageLink }} />
          </View>

          <View style={{
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <View>
              <Text style={getNameStyle()}>{name}</Text>
            </View>
            <View>
              <Text style={getCharacterStyle()} numberOfLines={1}>{description}</Text>
            </View>

            <View>
              <Text
                numberOfLines={1}
                style={getPriceStyle()}>{price}{' '}VND</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
  const renderItemCombo = ({ item }) => {
    const { _id, name, images, character } = item;
    const imageLink = images && images.length > 0 ? images[0] : null;
    return (
      <TouchableOpacity onPress={() => goToDetail(_id)}>
        <View
          style={{
            height: 134,
            backgroundColor: '#E8E8E8',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 5,
            borderRadius: 8,
          }}>
          <View
            style={{
              padding: 20,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: 250,
            }}>
            <Text
              style={{ color: '#000', fontSize: 16, }}
              numberOfLines={1}
            >{name}</Text>
            <Text
              style={{ color: '#7D7B7B', fontSize: 14, }}
              numberOfLines={3}
            >{character}{character}{character}{character}{character}</Text>
          </View>
          <Image
            style={{ width: 108, height: 134, borderTopRightRadius: 8, borderBottomRightRadius: 8, }}
            source={{ uri: imageLink }}></Image>
        </View>
      </TouchableOpacity>
    )
  }




  //STYLE
  const getContainerStyle = () => {
    return {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F6F6F6'
    }
  }
  const getBgHomeStyle = () => {
    return {
      width: '100%',
      height: 205,
    }
  }

  const getContainHeaderStyle = () => {
    return {
      backgroundColor: 'grey',
      width: '100%',
      marginTop: 113,
    }
  }
  const getTitleStyle = () => {
    return {
      fontSize: 24,
      color: '#221F1F',
      position: 'absolute',
      top: -235,
      left: 25,
    }
  }
  const getSubTitle = () => {
    return {
      fontSize: 16,
      color: '#007537',
      position: 'absolute',
      top: -160,
      left: 25,
    }
  }
  const getIconCartStyle = () => {
    return {
      width: 48,
      height: 46,
      borderRadius: 50,
      position: 'absolute',
      top: -240,
      right: 25,
    }
  }
  const getItemContainer = () => {
    return {
      width: 170,
      height: 217,
      margin: 7.5,
      borderRadius: 8,
      flexDirection: 'column',
      // backgroundColor: 'green'
    }
  }
  const getContainImgProducts = () => {
    return {
      width: '100%',
      height: 134,
      borderRadius: 8,
      backgroundColor: '#fff'
    }
  }
  const getImgProductStyle = () => {
    return {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    }
  }
  const getNameStyle = () => {
    return {
      fontSize: 16,
      color: '#221F1F'
    }
  }
  const getCharacterStyle = () => {
    return {
      fontSize: 14,
      color: '#7D7B7B'
    }
  }
  const getPriceStyle = () => {
    return {
      fontSize: 16,
      color: '#007537'
    }
  }
  const getCategoryStyle = () => {
    return {
      fontSize: 24,
      color: '#221F1F',
      marginBottom: 10,
    }
  }
  const getMoreStyle = () => {
    return {
      fontSize: 18,
      fontVariant: 'underline',
      textAlign: 'right',
      color: '#221F1F'
    }
  }
  const getContainMoreStyle = () => {
    return {
      borderBottomStyle: 'soiled',
      borderBottomWidth: 1,
      borderBottomColor: '#221F1F',
      marginTop: 20,
    }
  }



  return (
    <View style={getContainerStyle()}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}>
      </StatusBar>
      <View style={getContainHeaderStyle()}>
        <Image
          style={getBgHomeStyle()}
          source={require('../../../assets/images/backgroundHome.png')}
        />
        <View style={{ width: 223 }}>
          <Text
            style={getTitleStyle()}
          >Planta - Tỏa sáng không gian nhà bạn</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={getSubTitle()}
          >Xem hàng mới về</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToCart}>
          <Image
            style={getIconCartStyle()}
            source={require('../../../assets/images/icon_cart.jpg')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: 24 }}>
          <Text style={getCategoryStyle()}>Cây trồng</Text>
          <FlatList
            data={products.slice(0, 9)}
            renderItem={renderItemPlant}
            keyExtractor={item => item._id}
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            refreshing={refreshing}
            onRefresh={fetchProducts}
          >
          </FlatList>
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
            <View style={getContainMoreStyle()}>
              <Text style={getMoreStyle()} onPress={goToListProduct}>Xem thêm cây trồng</Text>
            </View>
          </TouchableOpacity>
        </View>


        <View style={{ padding: 24 }}>
          <Text style={getCategoryStyle()}> Chậu Cây trồng</Text>
          <FlatList
            data={products.slice(4, 8)}
            renderItem={renderItemPlant}
            keyExtractor={item => item._id}
            horizontal={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            refreshing={refreshing}
            onRefresh={fetchProducts}
          >
          </FlatList>
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
            <View style={getContainMoreStyle()}>
              <Text style={getMoreStyle()} onPress={goToListProduct}>Xem thêm phụ kiện</Text>
            </View>
          </TouchableOpacity>
        </View>



        <View style={{ padding: 24 }}>
          <Text style={getCategoryStyle()}>Combo chăm sóc (mới)</Text>
          <FlatList
            data={products.slice(8, 12)}
            renderItem={renderItemCombo}
            keyExtractor={item => item._id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            refreshing={refreshing}
            onRefresh={fetchProducts}
          >
          </FlatList>
          <TouchableOpacity style={{
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
            <View style={getContainMoreStyle()}>
              <Text style={getMoreStyle()} onPress={goToListProduct}>Xem thêm combo</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

