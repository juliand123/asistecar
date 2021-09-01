import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { map, size, isEmpty } from 'lodash'
import FormAddGarage from './FormAddGarage'
import uuid from 'random-uuid-v4'

import { validateEmail } from '../../../utils/helpers'
import UploadImagen from '../../UploadImagen'
import ShowMap from '../../ShowMap'
import { addDocumentWithoutId, getCurrentUser, uploadImage } from '../../../utils/actions'

const widthScreen = Dimensions.get("window").width

export default function AddGarageForm( { toastRef, setLoading, navigation } ) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [location, setLocation] = useState(null)

    const addGarage = async() => {
        if (!validForm()) {
            return
        }

        setLoading(true)
        const responseUploadImages = await UploadImagesOnStore()
        const garage = {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            description: formData.description,
            callingCode: formData.callingCode,
            phone: formData.phone,
            location,
            images: responseUploadImages,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: getCurrentUser().uid
        }
        // console.log(garage)
        const responseAddDocument = await addDocumentWithoutId("garages", garage)
        setLoading(false)
        if (!responseAddDocument.statusResponse) {
            toastRef.current.show("Error al guardar taller, por favor intenta más tarde.", 3000)
            return
        }
        navigation.navigate("GaragesScreen")
        // console.log("add-garage")
    }

    const UploadImagesOnStore = async() =>{
        const imagesUrl = []
        await Promise.all(
            map( imagesSelected, async(image) => {
                const response = await uploadImage(image, "garages", uuid())
                if(response.statusResponse){
                    imagesUrl.push(response.url)
                }
            })
        )
        return imagesUrl
    }

    const validForm = () => {
        clearErrors()
        let isValid = true

        if (isEmpty(formData.name)) {
            setErrorName("Debes ingresar el nombre del taller.")
            isValid = false
        }
        
        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar un email de taller válido.")
            isValid = false
        }

        if (isEmpty(formData.address)) {
            setErrorAddress("Debes ingresar la dirección del taller.")
            isValid = false
        }

        if (size(formData.phone) < 10) {
            setErrorPhone("Debes ingresar el teléfono del taller válido.")
            isValid = false
        }

        if (isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar una descripción del taller.")
            isValid = false
        }

        if (!location) {
            let addresError = "Debes de localizar el taller en el mapa."
            setErrorAddress(addresError)
            toastRef.current.show(addresError, 3000)
            isValid = false
        }

        if(size(imagesSelected) === 0) {
            let descError = "Debes de agregar al menos una imagen al taller."
            setErrorDescription(descError)
            toastRef.current.show(descError, 3000)
            isValid = false
        }
        return isValid
    }

    const clearErrors = () => {
        setErrorDescription(null)
        setErrorName(null)
        setErrorEmail(null)
        setErrorPhone(null)
        setErrorAddress(null)

    }

    return (
        <ScrollView style={styles.viewContainer}>
             <ImageGarage
                imageGarage={imagesSelected[0]}
            />
            <FormAddGarage
                formData={formData}
                setFormData={setFormData}
                errorName={ errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                setIsVisibleMap={setIsVisibleMap}
                location={location}
            />
            <UploadImagen
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Taller"
                onPress={addGarage}
                buttonStyle={styles.btnAddGarage}
            />
            <ShowMap
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocation={setLocation}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function ImageGarage({ imageGarage }){
    return (
        <View
            style={styles.viewPhoto}
        >
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageGarage ?
                    { uri: imageGarage} :
                    require("../../../assets/no-image.png")
                }
            />
        </View>
    )
}



const defaultFormValues = () => {
    return{
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        country: "CO",
        callingCode: "57"
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        height: "100%"
    },
    btnAddGarage:{
        margin: 20,
        backgroundColor: '#e7240e'
    },
    viewPhoto:{
        alignItems:'center',
        height:200,
        marginBottom:20
    }
})
