import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'

import Loading from '../../components/Loading'
import AddGarageForm from '../../components/garages/addGarageForm/AddGarageForm'

export default function AddGarage({ navigation }) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <AddGarageForm
                toastRef={toastRef}
                setLoading={setLoading}
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Creando taller"/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
