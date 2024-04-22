import { StyleSheet, TextInput as RNTextInput, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const TextInput = (props) => {
  const { placeHolder, eyePassword, error, onChangeText, value } = props
  const [eyeIcon, setEyeIcon] = useState(require('../../assets/images/hiddenPasswordIcon.png'))
  const [securePassword, setSecurePassword] = useState(true)

  const togglePasswordVisibility = () => {
    setSecurePassword(!securePassword);
    if (securePassword) {
      setEyeIcon(require('../../assets/images/eyeIcon.png'));
    } else {
      setEyeIcon(require('../../assets/images/hiddenPasswordIcon.png'));
    }
  }
  return (
    <View>
      {!eyePassword ? (
        <>
          <RNTextInput style={myStyle.textInput} placeholder={placeHolder} onChangeText={onChangeText} value={value} />
          {error && <Text style={myStyle.error}>{error}</Text>}
        </>
      ) : (
        <>
          <RNTextInput style={myStyle.textInput} placeholder={placeHolder} secureTextEntry={securePassword} onChangeText={onChangeText} value={value} />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image style={myStyle.eyePassword} source={eyeIcon} />
          </TouchableOpacity>
          {error && <Text style={myStyle.error}>{error}</Text>}
        </>
      )}
    </View>
  )
}

export default TextInput

const myStyle = StyleSheet.create({
  error: {
    marginLeft: 2,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red'
  },
  eyePassword: {
    position: 'absolute',
    right: 14,
    top: -37
  },
  textInput: {
    fontSize: 15,
    marginVertical: 5,
    width: '100%',
    height: 50,
    color: '#8B8B8B',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#8B8B8B',
  }
})