import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'


export default function FormAddGarage(
    {
        formData, setFormData, errorName, errorDescription, 
        errorEmail, errorAddress,  errorPhone, setIsVisibleMap,
        location
    }
) {
    const [country, setCountry] = useState("CO")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View
            style={styles.viewForm}
        >
            <Input
                placeholder="Nombre del taller..."
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección del taller..."
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type:"material-community",
                    name:"google-maps",
                    color: location ? "#3465f0" : "#e7240e",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                keyboardType="email-address"
                placeholder="Email del taller..."
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            <View
                style={styles.phoneView}
            >
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={
                        (country) => {
                            setFormData({...formData, "country": country.cca2, "callingCode": country.callingCode[0]})
                            setCountry(country.cca2)
                        }
                    }
                />
                <Input
                    placeholder="WhatsApp del taller..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
            </View>
            <Input
                placeholder="Descripción del taller..."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, "description")}
                errorMessage={errorDescription}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewForm:{
        marginHorizontal: 10
    },
    textArea:{
        height: 100,
        width: "100%"
    },
    phoneView:{
        width: "80%",
        flexDirection: 'row'
    },
    inputPhone:{
        width: "80%"
    }
})
