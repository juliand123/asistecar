import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { ScrollView, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import { map } from 'lodash'
import firebase from 'firebase/app'
import { addDocumentWithoutId, getDocumentById, getIsFavorite, getCurrentUser, deleteFavorite } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'
import CarouselIImages from '../CarousellImages'
import Loading from '../Loading'
import MapMechanic from '../../components/mechanics/MapMechanic'

const widthScreen = Dimensions.get("window").width

export default function Mechanic({ navigation, route }) {
    const { id, name } = route.params
    const [loading, setLoading] = useState(false)
    const [mechanic, setMechanic] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false)
        setCurrentUser(user)
    })

    navigation.setOptions({ title: name })

useFocusEffect(
    useCallback(() => {
        (async () => {
            const response = await getDocumentById("mechanics", id)
            if (response.statusResponse) {
                setMechanic(response.document)
            }
            else {
                setMechanic({})
                Alert.alert("Ocurrión un problema cargando el mecánico, intente mas tarde.")
            }
        })()
    }, [])
    )

    useEffect(() => {
        (async () => {
            if (userLogged && mechanic) {
                const response = await getIsFavorite(mechanic.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, mechanic])


    const addFavorite = async () => {
        if (!userLogged) {
            toastRef.current.show("Para agregar el mecánico a favoritos debes esar logueado.", 3000)
            return
        }
        setLoading(true)
        const response = await addDocumentWithoutId("favorites", {
            idUser: getCurrentUser().uid,
            idMechanic: mechanic.id
        })
        setLoading(false)
        if (response.statusResponse) {
            setIsFavorite(true)
            toastRef.current.show("Mecánico añadido a favoritos.", 3000)
        } else {
            toastRef.current.show("No se pudo adicionar el mecánico a favoritos.", 3000)
        }

    }

    const removeFavorite = async () => {
        setLoading(true)
        const response = await deleteFavorite(mechanic.id)
        setLoading(false)
        if (response.statusResponse) {
            setIsFavorite(false)
            toastRef.current.show("Mecánico eliminado de favoritos.", 3000)
        } else {
            toastRef.current.show("No se pudo eliminar el mecánico de favoritos.", 3000)
        }
    }


    if (!mechanic) {
        return <Loading isVisible={true} text="Cargando..." />
    }

    return (
        <ScrollView style={styles.viewBody}>
            <CarouselIImages 
            images={mechanic.images}
            height={250}
            width={widthScreen}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
            />
              <View style={styles.viewFavorites}>
                <Icon
                    type="material-community"
                    name={isFavorite ? "heart" : "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite}
                    color="#e7240e"
                    size={35}
                    underlayColor="transparent"
                />

            </View>
           <TitleMechanic
                name={mechanic.name}
                description={mechanic.description}
               // rating={mechanic.rating}
            />
            <MechanicInfo
                name={mechanic.name}
                location={mechanic.location}
                address={mechanic.address}
                email={mechanic.email}
                phone={formatPhone(mechanic.callingCode, mechanic.phone)}
                currentUser={currentUser}
            />
            <Loading isVisible={loading} text="Por favor espere" />
        </ScrollView>
    )
}

function MechanicInfo({ name, location, address, email, phone, currentUser }) {
    const listInfo = [
        { text: address, iconName: "map-marker" },
        { text: phone, iconName: "phone" },
        { text: email, iconName: "at" }
    ]
    return (
        <View style={styles.viewMechanicsInfo}>
            <Text style={styles.mechanicInfoTitle}>
                Información sobre el mecánico
            </Text>
            <MapMechanic
                location={location}
                name={name}
                height={150}
            />
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color={"#e7240e"}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.text}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    )
}

function TitleMechanic({ name, description }) {
//function TitleMechanic({ name, description, rating }) {
    return (
        <View style={styles.viewMechanicTitle}>
            <View style={styles.viewMechanicContainer}>
                <Text style={styles.nameMechanic}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    //startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionMechanic}>{description}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewMechanicTitle: {
        padding: 15,
    },
    viewMechanicContainer: {
        flexDirection: "row"
    },
    descriptionMechanic: {
        marginTop: 8,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    nameMechanic: {
        fontWeight: "bold"
    },
    viewMechanicsInfo: {
        margin: 15,
        marginTop: 25
    },
    mechanicInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerListItem: {
        borderBottomColor: "#e7240e",
        borderBottomWidth: 1
    },
    viewFavorites: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }

})
