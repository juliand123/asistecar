import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

import AddMechanicForm from '../../components/mechanics/AddMechanicForm'


export default function AddMechanic({ navigation }) {
   const toastRef = useRef()
   const [loading, setLoading] = useState(false)
  
   return (
        <KeyboardAwareScrollView>
            <AddMechanicForm 
            toastRef={toastRef}  
            setLoading={setLoading}
            navigation={navigation}
            />
            <Loading isVisible={loading} text="Creando mecánico..."/>
            <Toast ref={toastRef} position="center" opacity={0,9} />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
