import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet
} from 'react-native'
import RegisterForm from '../components/account/RegisterForm'


const RegisterScreen = () => {

  return (
    <KeyboardAwareScrollView>
      <RegisterForm></RegisterForm>
    </KeyboardAwareScrollView>
  )
}

export default RegisterForm

const styles = StyleSheet.create({
})