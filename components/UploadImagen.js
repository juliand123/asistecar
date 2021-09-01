import React from 'react'
import { ScrollView, StyleSheet, Alert } from 'react-native'
import { filter, map, size } from 'lodash'
import { Icon, Avatar } from 'react-native-elements'

import { loadImageFromGallery } from '../utils/helpers'

export default function UploadImagen({toastRef, imagesSelected, setImagesSelected}) {
    const imageSelect = async() => {
        const response = await loadImageFromGallery([4,3])
        if (!response.status) {
           toastRef.current.show("¡No has seleccionado ninguna imagen!", 3000) 
           return
        }
        setImagesSelected([...imagesSelected, response.image])
    }
    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style:"cancel"
                },
                {
                    text: "Si",
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
                        colo="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                        size={50}
                    />
                )
            }
            {
                map(imagesSelected, (imageGarage, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageGarage }}
                        onPress={() => removeImage(imageGarage)}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewImages:{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 10
    },
    containerIcon:{
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width: 70,
        height: 70,
        marginRight: 10
    }
})
