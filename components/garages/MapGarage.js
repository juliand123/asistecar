import { View } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import MapView from 'react-native-maps'
import OpenMap from 'react-native-open-maps'

export default function MapGarage({ location, name, height }) {
    const OpenAppMap = () => {
        OpenMap({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 19,
            query: name
        })
    }

    return (
        <MapView
            style={{height: height, width: "100%"}}
            initialRegion={location}
            onPress={OpenAppMap}
        >
            <MapView.Marker
                coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                }}
            />
        </MapView>
    )
}


