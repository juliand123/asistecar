import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet
} from 'react-native'
import LoginForm from '../components/account/LoginForm'


const LoginScreen = ({ navigation }) => {

  return (
    <KeyboardAwareScrollView>
      <LoginForm></LoginForm>
    </KeyboardAwareScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
})