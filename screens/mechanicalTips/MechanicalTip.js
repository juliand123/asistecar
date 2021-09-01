import React, { useState, useCallback, useRef } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { map } from 'lodash'
import Toast from 'react-native-easy-toast'

import { getDocumentById } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'
import { Rating } from 'react-native-ratings'
import Loading from '../../components/Loading'
import CarouselImages from '../../components/CarouselImages'
import MapGarage from '../../components/garages/MapGarage'
// import ListReviews from '../../components/garages/ListReviews'

const widthScreen = Dimensions.get("window").width

export default function Garage({ navigation, route }) {
    const { title, description, iconName } = route.params
    
    // const toastRef = useRef()

    // const [garage, setGarage] = useState(null)
    // const [activeSlide, setActiveSlide] = useState(0)
    // const [isFavorite, setIsFavorite] = useState(false)

    //show editable title on page
    navigation.setOptions({ title: title })

    // //when load and recall page
    // useFocusEffect(
    //     useCallback(() => {
    //         (async()=>{
    //             const response = await getDocumentById("garages", id)
    //             if (response.statusResponse) {
    //                 setGarage(response.document)
    //             }
    //             else{
    //                 //object without values, not is null
    //                 setGarage({})
    //                 Alert.alert("¡Ocurrio un problema cargando el taller, intente más tarde!")
    //             }
    //         })()
    //     }, [])
    // )

    // const addFavorite = () => {
    //     if (!userLogged) {
    //         toastRef.current.show("¡Para agregar el restaurante a favoritos, debes estar logueado!", 3000)
    //         return
    //     }
    //     console.log("add favorite")
    // }

    // const removeFavorite = () => {
    //     console.log("add favorite")
    // }

    if (!garage) {
        return <Loading isVisible={true} text="Cargando..."/>
    }
    

    return (
        <ScrollView
           style={styles.viewBody} 
        >
            {/* <CarouselImages
                images={garage.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            /> */}
            {/* <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline" }
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                    color={ isFavorite ? "#fff" : "#2596be" }
                    size={35}
                    underlayColor="transparent"
                />
            </View> */}
            <TitleGarage
                name={title}
                description={description}
                // rating={garage.rating}
            />
            {/* <GarageInfo
                name={garage.name}
                location={garage.location}
                address={garage.address}
                email={garage.email}
                phone={formatPhone(garage.callingCode, garage.phone)}
            /> */}
            {/* <ListReviews
                navigation={navigation}
                idRestaurant={garage.id}
            /> */}
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    )
}

function TitleGarage( { name, description, rating } ){
    return(
        <View style={styles.viewGarageTitle}>
            <View style={styles.viewGarageContainer}>
                <Text style={styles.nameGarage}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionGarage}>{description}</Text>
        </View>
    )
}

function GarageInfo({name, location, address, email, phone}){
    const listInfo = [
        { text: address, iconName: "map-marker"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"},
    ]
    return (
        <View style={styles.viewGarageInfo}>
            <Text style={styles.garageInfoTitle}>
                Información sobre el taller
            </Text>
            <MapGarage
                location={location}
                name={name}
                height={150}
            />
            {
                // use () for return implicite
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#2596be"
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

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:"#fff"
    },
    viewGarageTitle:{
        padding: 15,
    },
    viewGarageContainer:{
        flexDirection: "row"
    },
    descriptionGarage:{
        marginTop: 8,
        color:"gray",
        textAlign:"justify"
    },
    rating:{
        position: "absolute",
        right:0
    },
    nameGarage:{
        fontSize:18,
        fontWeight:"bold"
    },
    viewGarageInfo:{
        margin: 15,
        marginTop: 25
    },
    garageInfoTitle:{
        fontSize:16,
        fontWeight:"bold",
        marginBottom: 15
    },
    containerListItem:{
        borderBottomColor: '#f58325',
        borderBottomWidth: 1
    },
    viewFavorite:{
        position:"absolute",
        top:0,
        right:0,
        backgroundColor: "#fff", 
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    }

})
