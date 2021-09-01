import React from 'react'
import { StyleSheet, View } from 'react-native'


import Garages from '../garages/Garages'

export default function GaragesScreen({navigation}) {
    return (
        <View style= {styles.container}>
        <Garages  navigation={navigation}></Garages>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10
       }
})

