import { size } from 'lodash'
import React from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import { formatPhone } from '../../utils/helpers'



export default function ListMechanics({ mechanics, navigation, handleLoadMore }) {
    return (
        <View>
          <FlatList
                data={mechanics}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem={(mechanic) => (
                    <Mechanic mechanic={mechanic} navigation={navigation}/>
                )}
            />
    </View>
)
}

function Mechanic({ mechanic, navigation, handleLoadMore }) {
    const { id, images, name, address, description, phone, callingCode } = mechanic.item
    const imageMechanic = images[0]
  
    const goMechanic = () => {
        navigation.navigate("Mechanic", { id, name })
    }
    return (
        <TouchableOpacity onPress={goMechanic}>
            <View style={styles.viewMechanic}>
                <View style={styles.viewMechanicImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={{ uri: imageMechanic }}
                        style={styles.imageMechanic}
                    />
                </View>
                <View>
                    <Text style={styles.mechanicTitle}>{name}</Text>
                    <Text style={styles.mechanicInformation}>{address}</Text>
                    <Text style={styles.mechanicInformation}>{formatPhone(callingCode, phone)}</Text>
                    <Text style={styles.mechanicInformation}>
                        {
                            size(description) > 0
                                ? `${description.substr(0, 60)}...`
                                : description
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewMechanic: {
        flexDirection: "row",
        margin: 10
    },
    viewMechanicImage: {
        marginRight: 15
    },
    imageMechanic: {
        width: 90,
        height: 90
    },
    mechanicTitle: {
        fontWeight: "bold"
    },
    mechanicInformation: {
        paddingTop: 2,
        color: "grey"
    },
    mechanicDescription: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    }
})