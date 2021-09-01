import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { map } from 'lodash'
import React from 'react'

import MapGarage from '../../components/garages/MapGarage'

export default function GarageInfo({ name, description, rating, locationGarage, address, email, phone }) {
    // console.log(locationGarage)
    return (
        <View style={styles.viewTitle}>
            <View style={styles.viewContainer}>
                <Text style={styles.name}>
                    {name}
                </Text>
                {/* <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                /> */}
            </View>
            <Text style={styles.description}>
                {description}
            </Text>
            <View style={styles.viewInfo}>
                <Text style={styles.InfoTitle}>
                    Información sobre el taller
                </Text>
                <MapGarage
                    location={locationGarage}
                    name={name}
                    height={150}
                />
                <GarageInfoDetail
                    address={address}
                    email={email}
                    phone={phone}
                />
            </View>

        </View>
    )
}


function GarageInfoDetail({ address, email, phone }){
    const listInfo = [
        { text: address, iconName: "map-marker"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"},
    ]
    return (
        map(listInfo, (item, index) => (
            <ListItem
                key={index}
                style={styles.containerListItem}
            >
                <Icon
                    type="material-community"
                    name={item.iconName}
                    color="#3465f0"
                />
                <ListItem.Content>
                        <ListItem.Title>
                            {item.text}
                        </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        ))
    )
}

const styles = StyleSheet.create({
    viewTitle:{
    padding: 15,
    },
    viewContainer:{
        flexDirection: "row"
    },
    description:{
        marginTop: 8,
        color:"gray",
        textAlign:"justify"
    },
    rating:{
        position: "absolute",
        right:0
    },
    name:{
        fontSize:18,
        fontWeight:"bold"
    },
    viewInfo:{
        margin: 15,
        marginTop: 25
    },
    InfoTitle:{
        fontSize:18,
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
