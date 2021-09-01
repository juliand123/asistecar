import React from 'react'
import { StyleSheet, View } from 'react-native'
import AddAssistance from '../asisstance/AddAssistance'


export default function AssistanceScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <AddAssistance navigation={navigation} ></AddAssistance>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    }
})
