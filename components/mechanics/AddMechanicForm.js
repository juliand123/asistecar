import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Button, Input, Icon, Avatar, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import MapView from 'react-native-maps'
import uuid from 'random-uuid-v4'

import { getCurrentLocation, loadImageFromGallery, validateEmail } from '../../utils/helpers'
import { getCurrentUser, uploadImage, addDocumentWithoutId } from '../../utils/actions'
import Modal from '../../components/Modal'

const widthScreen = Dimensions.get("window").width

export default function AddMechanicForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())

    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationMechanic, setLocationMechanic] = useState(null)

    const addMechanic = async () => {
        if (!validForm()) {
            return
        }

        setLoading(true)
        const responseUploadImages = await uploadImages()
        const mechanic = {
            name: formData.name,
            address: formData.address,
            email: formData.email,
            phone: formData.phone,
            callingCode: formData.callingCode,
            location: locationMechanic,
            images: responseUploadImages,
            description: formData.description,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: getCurrentUser().uid

        }
        const responseAddDocument = await addDocumentWithoutId("mechanics", mechanic)

        setLoading(false)

        if (!responseAddDocument.statusResponse) {
            console.log(responseAddDocument)
            toastRef.current.show("Error al grabar el mecánico, por favor intente más tarde.", 3000)
            return
        }
        navigation.navigate("MechanicsScreen")
        console.log(formData)
        console.log(mechanic)
    }

    const uploadImages = async () => {
        const imagesUrl = []
        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await uploadImage(image, "mechanics", uuid())
                if (response.statusResponse) {
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
            setErrorName("Debes ingresar el nombre del mecánico...")
            isValid = false
        }
        if (isEmpty(formData.address)) {
            setErrorAddress("Debes ingresar la dirección del mecánico...")
            isValid = false
        }

        if (!validateEmail(formData.email)) {
            setErrorEmail("Debes ingresar el email del mecánico válido...")
            isValid = false
        }

        if (size(formData.phone) < 10) {
            setErrorPhone("Debes ingresar un teléfono de mecánico válido...")
            isValid = false
        }
        if (isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar la descripción del mecánico...")
            isValid = false
        }

        if (!locationMechanic) {
            toastRef.current.show("Debes de localizar el mecánico en el mapa.", 3000)
            isValid = false
        }
        else if (size(imagesSelected) === 0) {
            toastRef.current.show("Debes de agregar al menos una imagen al mecánico.", 3000)
            isValid = false
        }
        return isValid
    }

    const clearErrors = () => {
        setErrorDescription(null)
        setErrorEmail(null)
        setErrorName(null)
        setErrorPhone(null)
        setErrorAddress(null)
    }



    return (
        <ScrollView style={styles.viewContainer}>
            <ImageMechanic
                imageMechanic={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorPhone={errorPhone}
                errorAddress={errorAddress}
                setIsVisibleMap={setIsVisibleMap}
                locationMechanic={locationMechanic}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}

            />
            <Button
                title="Crear Mecánico"
                onPress={addMechanic}
                buttonStyle={styles.btnAddMechanic}
            />
            <MapMechanic
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationMechanic={setLocationMechanic}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function MapMechanic({ isVisibleMap, setIsVisibleMap, setLocationMechanic, toastRef }) {
    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()
            if (response.status) {
                setNewRegion(response.location)
            }

        })()
    }, [])

    const confirmLocation = () => {
        setLocationMechanic(newRegion)
        toastRef.current.show("Localización guardada correctamente.", 3000)
        setIsVisibleMap(false)
    }

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation={true}
                            onRegionChange={(region) => setNewRegion(region)}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                draggable
                            />

                        </MapView>
                    )
                }
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicación"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation} />
                    <Button
                        title="Cancelar Ubicación"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)} />
                </View>
            </View>
        </Modal>
    )
}

function ImageMechanic({ imageMechanic }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageMechanic
                        ? { uri: imageMechanic }
                        : require("../../assets/no-image.png")
                }
            />
        </View>
    )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {

    const imageSelect = async () => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que quieres la imagen?",
            [

                {
                    text: "No",
                    style: "Cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imageMechanic, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageMechanic }}
                        onPress={() => removeImage(imageMechanic)}
                    />
                ))
            }
        </ScrollView>
    )

}

function FormAdd({
    formData,
    setFormData,
    errorName,
    errorDescription,
    errorEmail,
    errorAddress,
    errorPhone,
    setIsVisibleMap,
    locationMechanic }) {
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del mecánico..."
                defaultFormValues={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Dirección del mecánico..."
                defaultFormValues={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationMechanic ? "#df0024" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                keyboardType="email-address"
                placeholder="Email del mecánico..."
                defaultFormValues={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({
                            ...formData,
                            "country": country.cca2,
                            "callingCode": country.callingCode[0]
                        })
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp del mecánico..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultFormValues={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
            </View>
            <Input
                placeholder="Descripción del mecánico..."
                multiline
                containerStyle={styles.textArea}
                defaultFormValues={formData.description}
                onChange={(e) => onChange(e, "description")}
                errorMessage={errorDescription}
            />
        </View>)
}

const defaultFormValues = () => {

    return {
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
    containerBtns: {
        flex: 1,
        flexDirection: 'row'
    },
    viewButton: {

        width: '53%',
        height: 60

    },
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10,
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddMechanic: {
        width: '50%',
        marginTop: 10,
        marginEnd: 10,
        marginLeft: 100,
        marginRight: 10,
        backgroundColor: "#e7240e"
    },
    btnCancel: {
        width: '70%',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 30,
        backgroundColor: "#ff8038"
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 5
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a65273"
    },
    viewMapBtnSave: {
        backgroundColor: "#df0024"
    },
    

})
