import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const InputSubtitle = (props) => {
    const { value, placeholder, editable, color, onChangeText } = props;
    // Define the style based on the color prop
    const textStyle = color === 'black' ?
        [styles.subTitle, { color: 'black', fontWeight: 'bold' }] :
        styles.subTitle;

    return (
        <View>
            <TextInput editable={editable} onChangeText={onChangeText} style={textStyle} placeholder={placeholder} value={value} />
        </View>
    );
}

export default InputSubtitle;

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 18,
        borderWidth: 0,
        borderBottomColor: 'gray',
        paddingBottom: 5,
        borderBottomWidth: 1,
        marginBottom: 2
    },
});
