import React from 'react'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'

const Book = ({name, image}) => {
    return (
        <View style={styles.ebook}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={{ width: Dimensions.get('window').width / 2.5 }}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{name}</Text>
            </View>
        </View>
    )
}

export default Book

const styles = StyleSheet.create({
    image: {
      width: Dimensions.get('window').width/2.5,
      height: Dimensions.get('window').height/3,
      aspectRatio: 'auto'
    },
    ebook: {
      padding: 10,
      backgroundColor: '#EFF3F6',
      borderRadius: 10,
      margin: 10
    }
})
