import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'

import { updateProfile, uploadImage } from '../../utils/actions'
import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({ user, setLoading, setLoadingText }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto = async () => {
        const result = await loadImageFromGallery([1, 1])
        if (!result.status) {
            return
        }
        setLoadingText("Actualizando imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        
        if (!resultUploadImage.statusResponse) {
            setLoading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")
            return
        }
        const resultUpdateProfile = await updateProfile({ photoURL: resultUploadImage.url })
        setLoading(false)

        if (resultUpdateProfile.statusResponse) {
            setPhotoUrl(resultUploadImage.url)
        }
        else {
            Alert.alert("Ha ocurrido un error al actualizar la foto de perfil.")
        }
    }

    return (
        <View style={styles.container}>
            <Avatar
                onPress={changePhoto}
                rounded={true}
                size="large"                
                containerStyle={styles.avatar}
                source={
                    photoUrl
                        ? { uri: photoUrl }
                        : require("../../assets/avatar-default.jpg")
                }
            />
            <View styles={styles.infoUser}>
                <Text style={styles.displayname}>
                    {
                        user.displayName ? user.displayName : "Anónimo"
                    }
                </Text>
                <Text>
                    {user.email}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30,
    },
    infoUser: {
        marginLeft:30,
    
    },
    displayname: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    avatar:{
        marginRight: 10
    }
})
