import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import MapView from 'react-native-maps'

import { getCurrentLocation } from '../utils/helpers'
import Modal from '../components/Modal'

export default function ShowMap({ isVisibleMap, setIsVisibleMap, setLocation, toastRef }) {
    const [newRegion, setNewRegion] = useState(null)
    useEffect(() => {
        (async() => {
            const response = await getCurrentLocation()
            if (response.status) {
                setNewRegion(response.location)
            }
            console.log(newRegion)
        })()
    }, [])
    
    const ConfirmLocation = () =>{
        setLocation(newRegion)
        toastRef.current.show("¡Localización guardada correctamente!", 3000)
        setIsVisibleMap(false)
    }
    return (
        <Modal
            isVisible={isVisibleMap}
            setIsVisibleMap={setIsVisibleMap}
        >
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation
                            onRegionChange={(region) => setNewRegion(region)}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                //user can change position
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
                        onPress={ConfirmLocation}
                    />
                    <Button
                        title="Cancelar Ubicación"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    mapStyle:{
        width: "100%",
        height: 550
    },
    viewMapBtn:{
        flexDirection:"row",
        justifyContent: 'center',
        marginTop: 10
    },
    viewMapBtnContainerCancel:{
        paddingLeft: 5
    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnCancel:{
        backgroundColor: "#f58325",
    },
    viewMapBtnSave:{
        backgroundColor: "#df0024"
    }
})
