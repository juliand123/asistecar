import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'


import Loading from '../../components/Loading'
import { getMoreMechanics, getMechanics } from '../../utils/actions'
import ListMechanics from '../../components/mechanics/ListMechanics'
const heightScreen = Dimensions.get("window").height


export default function Mechanics({ navigation } ) {
    
    const [startMechanic, setStartMechanic] = useState(null)
    const [mechanics, setMechanics] = useState([])
    const [loading, setLoading] = useState(false)

    const limitMechanics = 10

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getMechanics(limitMechanics)
                if (response.statusResponse) {
                    setStartMechanic(response.startMechanic)
                    setMechanics(response.mechanics)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    const handleLoadMore = async () => {
        if (!startMechanic) {
            return
        }
        setLoading(true)
        const response = await getMoreMechanics(limitMechanics, startMechanic)
        if (response.statusResponse) {
            setStartMechanic(response.startMechanic)
            setMechanics([...mechanics, ...response.mechanics])
        }
        setLoading(false)
    }

    return (
        <View style={styles.viewBody}>
            {
                
                size(mechanics) > 0 ? (
                    
                    <ListMechanics
                        mechanics={mechanics}
                        navigation={navigation}
                        handleLoadMore={handleLoadMore}
                    />
            
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay mecánicos registrados.</Text>
                    </View>
                )
            }
            <Icon
                type="material-community"
                name="plus"
                color="#e7240e"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("AddMechanic")}
            />
            <Loading isVisible={loading} text="Cargando mecánicos..." />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom: (heightScreen -150),
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        marginEnd: 5
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 500
    },
    notFoundText: {
        fontSize: 14,
        fontWeight: "bold"
    }
})
