import React from 'react'
import {View, StyleSheet} from 'react-native'
const HR = ({width}) => {
  return (
    <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: 'gray', height: StyleSheet.hairlineWidth, width: width, marginVertical: 10}}>
    </View>
  )
}

export default HR
