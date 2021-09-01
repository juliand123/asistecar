import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'
import AddAssistanceForm from '../../components/assistance/AddAssistanceForm'
import Loading from '../../components/Loading'

export default function AddAssistance({ navigation }) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
   
    return (
        // <KeyboardAwareScrollView>
        <View>
            <AddAssistanceForm
                toastRef={toastRef}
                setLoading={setLoading}
                navigation={navigation}
            />
            <Loading isVisible={loading} text={"Creando asistencia..."} />
         
            <Toast ref={toastRef} position="center" opacity={0, 9} />
            </View>
        // </KeyboardAwareScrollView> */}
    )
}
const styles = StyleSheet.create({})

