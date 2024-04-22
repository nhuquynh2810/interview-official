import { StyleSheet, Text, FlatList, Image, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AxiosInstance from '../../helpers/AxiosInstance';

const Search = (props) => {
  //NAVIGATION
  const { navigation } = props;
  const goBack = () => {
    navigation.goBack();
  }
  const goToDetail = (_id) => {
    navigation.navigate('Details', { _id: _id })
  }

  //DATA
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const response = await AxiosInstance().get(`/products/findProductsByKey_App?key=${search}`);
      setProducts(response.data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }
  console.log('pr', products);

  useEffect(() => {
    fetchProducts();
  }, [search])


  //RENDER ITEM
  const renderItem = ({ item }) => {
    const { _id, name, price, images, quantity, category } = item;
    const imageLink = images && images.length > 0 ? images[0] : null;
    return (
      <TouchableOpacity onPress={() => goToDetail(_id)} key={_id}>
        <View style={styles.item} key={_id}>
          <Image style={styles.image} source={{ uri: imageLink }} />
          <View>
            <View style={styles.nameCategory}>
              <Text style={styles.name} >{name} | </Text>
              <Text style={styles.category} >{category.category_name}</Text>
            </View>
            <Text style={styles.price} >{price}</Text>
            <Text style={styles.quantity} >Còn {quantity} sp</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image style={styles.backIcon} source={require('../../../assets/images/backIcon.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>TÌM KIẾM</Text>
        <View></View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder='Tìm kiếm' onChangeText={setSearch} value={search} />
        <TouchableOpacity style={styles.searchIcon}>
          <Image source={require('../../../assets/images/searchIcon.png')} />
        </TouchableOpacity>
      </View>

      <FlatList style={styles.list}
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        //Khi nào thanh seach có giá trị mới loading
        refreshing={search !== '' && refreshing}
        onRefresh={fetchProducts}
      />

    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  price: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black'
  },
  price: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500'
  },
  category: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500'
  },
  name: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500'
  },
  nameCategory: {
    flexDirection: 'row'
  },
  image: {
    width: '25%',
    height: 80,
    marginRight: 15
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 10
  },
  input: {
    width: '95%',
    fontSize: 18,
    borderBottomWidth: 1.5,
    padding: 3
  },
  searchContainer: {
    marginBottom: 40,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  backIcon: {
    marginLeft: -10
  },
  title: {
    fontSize: 20,
    color: 'black'
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 20
  }
})
