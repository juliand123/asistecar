import React, { useState, useEffect, useCallback } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'

import Loading from '../../components/Loading'
import { getDocumentsWithLimit, getMoreGarages } from '../../utils/actions'
import ListGarages from '../../components/garages/ListGarages'

const heightScreen = Dimensions.get("window").height

export default function Garages({ navigation }) {
    const [startGarage, setStartGarage] = useState(null)
    const [garages, setGarages] = useState([])
    const [loading, setLoading] = useState(false)

    const limitGarages = 7

    useFocusEffect(
        useCallback(() => {
            async function getData(){
                setLoading(true)
                const response = await getDocumentsWithLimit("garages", limitGarages)
                if (response.statusResponse) {
                    setStartGarage(response.start)
                    setGarages(response.documents)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    const handleLoadMore = async() =>{
        if (!startGarage) {
            return
        }
        setLoading(true)
        const response = await getMoreGarages(limitGarages, startGarage)
            if (response.statusResponse) {
                setStartGarage(response.startGarage)
                setGarages([...garages, ...response.garages])
            }
        setLoading(false)
    }

    // if (user === null) {
    //     return <Loading isVisible={true} text="Cargando..."/>
    // }

    return (
        <View
            style={styles.viewBody}
        >
            {
                size(garages) > 0 ? (
                    <ListGarages
                        garages={garages}
                        navigation={navigation}
                        handleLoadMore={handleLoadMore}
                    />
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>
                            Ohh!! no hay talleres registrados...
                        </Text>
                    </View>
                )
            }
            {
                <Icon
                    type="material-community"
                    name="plus"
                    color="#e7240e"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate('AddGarage')}
                />
            }
            <Loading isVisible={loading} text="Cargando Talleres..."/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
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
    notFoundView:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        marginTop: 500
    },
    notFoundText:{
        fontSize:14,
        color: "gray"
    }
})
