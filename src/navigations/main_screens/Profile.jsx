import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../redux/Reducer'

const Profile = (props) => {

  //NAVIGATION
  const { navigation } = props;
  const goToChangeInfo = () => {
    navigation.navigate('ChangeInfo');
  }

  const goToHistory = () => {
    console.log('Kiểm tra: ', appState.user.carts);
    navigation.navigate('History');
  }

  const goToManual = () => {
    navigation.navigate('Manual')
  }
  //DATA
  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();

  //LOGOUT
  const handlerLogOut = () => {
    dispatch(logOut());
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PROFILE</Text>

      <View style={styles.headerContainer}>
        <Image style={styles.avatar} source={{ uri: appState.user.avatar }} />
        <View style={styles.info}>
          <Text style={styles.name}>{appState.user.name}</Text>
          <Text style={styles.email}>{appState.user.email}</Text>
        </View>
      </View>

      <View style={styles.body1}>
        <Text style={styles.textUnderlined}>Chung</Text>
        <Text style={styles.catogeryText} onPress={goToChangeInfo}>Chỉnh sửa thông tin</Text>
        <Text style={styles.catogeryText} onPress={goToManual}>Cẩm nang cây trồng</Text>
        <Text style={styles.catogeryText} onPress={goToHistory}>Lịch sử giao dịch</Text>
        <Text style={styles.catogeryText}>Q&A</Text>
      </View>

      <View style={styles.body2}>
        <Text style={styles.textUnderlined}>Bảo mật và Điều khoản</Text>
        <Text style={styles.catogeryText}>Điều khoản và điều kiện</Text>
        <Text style={styles.catogeryText}>Chính sách quyền riêng tư</Text>
        <Text style={styles.dangXuatText} onPress={handlerLogOut}>Đăng xuất</Text>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  textUnderlined: {
    fontSize: 18,
    color: 'black',
    borderWidth: 0,
    borderBottomColor: 'gray',
    paddingBottom: 5,
    borderBottomWidth: 1,
    marginBottom: 12
  },
  dangXuatText: {
    marginTop: 5,
    fontSize: 18,
    color: 'red',
    fontWeight: '500'
  },
  catogeryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20
  },
  body1: {
    marginTop: 60
  },
  body2: {
    marginTop: 30
  },
  name: {
    color: 'black',
    fontSize: 18,
  },
  info: {
    justifyContent: 'center'
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 30,
    borderRadius: 10
  },
  headerContainer: {
    marginTop: 40,
    flexDirection: 'row'
  },
  title: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: '400',
    fontSize: 23
  },
  container: {
    flex: 1,
    padding: 25
  }
})