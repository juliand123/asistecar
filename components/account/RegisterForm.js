import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { Input, Icon } from 'react-native-elements'
import { size } from 'lodash'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/actions'
import Loading from '../Loading'

export default function RegisterForm() {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })

    }

    const doRegisterUser = async () => {
        if (!validateData()) {
            return;
        }
        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
            return
        }
        navigation.replace('DrawerNavigationRoutes')
    }

    const validateData = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email valido.")
            isValid = false
        }

        if (size(formData.password) < 6) {
            setErrorPassword("Debes ingresar una contraseña de al menos 6 caracteres")
            isValid = false
        }
        if (size(formData.confirm) < 6) {
            setErrorConfirm("Debes ingresar una confirmación de contraseña de al menos 6 caracteres")
            isValid = false
        }

        if (formData.password !== formData.confirm) {
            setErrorPassword("Las contraseña y la confirmación no coinciden")
            setErrorConfirm("Las contraseña y la confirmación no coinciden")
            isValid = false
        }
        return isValid
    }

    return (
        <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.bigCircle}></View>
                    <View style={styles.smallCircle}></View>
                    <View style={styles.centerizedView}>
                        <View style={styles.authBox}>
                            <View style={styles.logoBox}>
                                <Image
                                    source={require('../../assets/roundedlogo.png')}
                                    style={styles.image}
                                />
                            </View>
                            <Text style={styles.loginTitleText}>Registro</Text>
                            <View style={styles.hr}></View>
                            <View style={styles.inputBox}>
                                <Input
                                    containerStyle={styles.input}
                                    placeholder="Ingresa tu email..."
                                    onChange={(e) => onChange(e, "email")}
                                    keyboardType="email-address"
                                    errorMessage={errorEmail}
                                    defaultValue={formData.email}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <Input
                                    containerStyle={styles.input}
                                    placeholder="Ingresa tu contraseña..."
                                    password={true}
                                    secureTextEntry={!showPassword}
                                    onChange={(e) => onChange(e, "password")}
                                    errorMessage={errorPassword}
                                    defaultValue={formData.password}
                                    rightIcon={
                                        <Icon
                                            type="material-community"
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            iconStyle={styles.icon}
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    }
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <Input
                                    containerStyle={styles.input}
                                    placeholder="Confirma tu contraseña..."
                                    password={true}
                                    secureTextEntry={!showPassword}
                                    onChange={(e) => onChange(e, "confirm")}
                                    errorMessage={errorConfirm}
                                    defaultValue={formData.confirm}
                                    rightIcon={
                                        <Icon
                                            type="material-community"
                                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                                            iconStyle={styles.icon}
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    }
                                />
                            </View>

                            <TouchableOpacity style={styles.loginButton} onPress={() => doRegisterUser()}>
                                <Text style={styles.loginButtonText}>Registrar Nuevo Usuario</Text>
                            </TouchableOpacity>
                        </View>
                        <Loading isVisible={loading} text="Creando cuenta..." />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    )
}

const defaultFormValues = () => {
    return { email: "", password: "", confirm: "" }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        height: 800
    },
    bigCircle: {
        width: Dimensions.get('window').height * 0.7,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: '#ff8038',
        borderRadius: 1000,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.25,
        top: -50,
    },
    smallCircle: {
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: '#ff8038',
        borderRadius: 1000,
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.2,
        right: Dimensions.get('window').width * -0.3,
    },
    centerizedView: {
        width: '100%',
        top: '15%',
    },
    authBox: {
        width: '90%',
        backgroundColor: '#fafafa',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoBox: {
        width: 100,
        height: 100,
        backgroundColor: '#eb4d4b',
        borderRadius: 1000,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: -50,
        marginBottom: -50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {
        marginTop: 15,
        height: 130,
        width: "140%",
        marginBottom: 20
    },
    loginTitleText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
    },
    hr: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#444',
        marginTop: 6,
    },
    inputBox: {
        marginTop: 30,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#dfe4ea',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#e7240e',
        marginTop: 45,
        paddingVertical: 10,
        borderRadius: 4,
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnLogin: {
        color: "#df0024",
        fontWeight: "bold"
    },
    forgotPasswordText: {
        textAlign: 'center',
        marginTop: 12,
        fontSize: 16,
    },
})