import { size } from 'lodash'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'

import { formatPhone } from '../../utils/helpers'

export default function ListGarages({ garages, navigation, handleLoadMore }) {
    return (
        <View>
            <FlatList
                data={garages}
                //unique key
                keyExtractor={(item, index) => index.toString()}
                //reach 50% load more
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem={(garage) => (
                    <GarageItem
                        garage={garage}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    )
}

function GarageItem({ garage, navigation }){
    const { id, images, name, address, description, phone, callingCode } = garage.item
    const imageGarage = images[0]
    
    const goGarage = () => {
        // console.log("goGarage", id, name)
        navigation.navigate("Garage", { id, name })
    }
    return (
        <TouchableOpacity onPress={goGarage}>
            <View style={styles.viewGarage}>
                <View style={styles.viewGarageImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                        source={ { uri: imageGarage } }
                        style={styles.imageGarage}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.information}>{address}</Text>
                    <Text style={styles.information}>{formatPhone(callingCode, phone)}</Text>
                    <Text style={styles.description}>
                        {
                            size(description) > 60 
                            ? `${description.substr(0,60)}...` 
                            : description
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewGarage:{
        flexDirection:"row",
        margin: 10
    },
    viewGarageImage:{
        marginRight: 15
    },
    imageGarage:{
        width: 100,
        height: 100
    },
    title:{
        fontWeight: 'bold',
    },
    information:{
        paddingTop:2,
        color: "gray"
    },
    description:{
        paddingTop:2,
        color: "gray",
        width:"75%"
    }
})
