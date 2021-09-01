import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MechanicalTips from '../mechanicalTips/MechanicalTips'

export default function MechanicalTipsScreen({ navigation }) {
    return (
        <View style= {styles.container}>
        <MechanicalTips navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:10
       }
})
