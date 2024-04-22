import { StyleSheet, Text, Image, FlatList, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const ListProduct = (props) => {
    const [selectedCategory, setSelectedCategory] = useState(0)

    //NAVIGATION
    const { navigation } = props;

    const goBack = () => {
        navigation.goBack();
    }
    const goToCart = () => {
        navigation.navigate('Cart');
    }
    const goToDetail = (_id) => {
        navigation.navigate('Details', { _id: _id })
    }
    //lấy products bên Home qua, tạm thời...
    const products = props?.route?.params?.products;


    //RENDER
    const renderItemProduct = ({ item }) => {
        const { _id, name, images, category, price } = item;
        const imageLink = images && images.length > 0 ? images[0] : null;
        return (
            <TouchableOpacity style={styles.itemProduct} onPress={() => goToDetail(_id)}>
                <Image style={styles.image} source={{ uri: imageLink }} />
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <Text style={styles.catogery}>{category.category_name}</Text>
                <Text style={styles.price}>{price}{" "}VND</Text>
            </TouchableOpacity>
        )
    }

    //Tạo mảng cứng cho category
    const categoryData = [{ "_id": 1, name: "Tất cả" }, { "_id": 2, name: "Hàng mới về" }, { "_id": 3, name: "Ưa bóng" }, { "_id": 4, name: "Ưa sáng" }];
    const renderItemCategory = ({ item }) => {
        const { _id, name } = item;
        return (
            <TouchableOpacity
                key={_id}
                onPress={() => setSelectedCategory(item._id)}
                style={[getContainCategoriesStyle(), selectedCategory === item._id && { backgroundColor: 'green' }]}
            >
                <Text style={[getTextCategoriesStyle(), selectedCategory === item._id && { color: '#fff' }]}>{name}</Text>

            </TouchableOpacity>
        )
    }
    const getContainCategoriesStyle = () => {
        return {
            marginHorizontal: 10,
            height: 28,
            padding: 5,
            marginBottom: 20,
            borderRadius: 4,
        }
    }
    const getTextCategoriesStyle = () => {
        return {
            color: '#7D7B7B',
            fontSize: 14,
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={goBack}>
                    <Image style={styles.backIcon} source={require('../../../assets/images/backIcon.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>CÂY TRỒNG</Text>
                <TouchableOpacity onPress={goToCart}>
                    <Image style={styles.backIcon} source={require('../../../assets/images/cartIcon.png')} />
                </TouchableOpacity>
            </View>
            <FlatList style={styles.listCategory}
                data={categoryData}
                horizontal
                renderItem={renderItemCategory}
                keyExtractor={item => item._id}
                showsHorizontalScrollIndicator={false}
            />
            <FlatList style={styles.listProduct}
                data={products}
                renderItem={renderItemProduct}
                numColumns={2}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default ListProduct

const styles = StyleSheet.create({
    categoryListText: {
        fontSize: 17
    },
    itemCatogery: {
        marginRight: 15,
        padding: 5
    },
    listCategory: {
        paddingLeft: 17,
        marginBottom: 15,
        marginTop: 5,
    },
    price: {
        color: 'green',
        fontSize: 20,
        fontWeight: '500'
    },
    category: {
        fontSize: 17,
    },
    name: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        height: 150
    },
    listProduct: {
        paddingHorizontal: 10
    },
    itemProduct: {
        marginBottom: 40,
        flexDirection: 'column',
        padding: 5,
        width: '47%',
        height: 189,
        margin: 5
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
        paddingTop: 20,
        flex: 1,
        padding: 10
    }
})

