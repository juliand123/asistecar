import React, {useState, useCallback} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Mechanics from '../mechanics/Mechanics'
export default function MechanicsScreen ({navigation}) {
    
    return (
            <View style= {styles.container}>
            <Mechanics  navigation={navigation}></Mechanics>
            </View>
            
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10
       }
})
