import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Image } from 'react-native-elements'
import { size } from 'lodash'

export default function CarouselImages({ images, height, width, activeSlide, setActiveSlide }) {
    const renderItem = ({item}) => {
        return(
            <Image
                style={{ width, height }}
                //ActivityIndicator = loading image
                PlaceHolderContent={<ActivityIndicator color="#fff"/>}
                source={ {uri: item} }
            />
        )
    }
    return (
        <View>
            <Carousel
                layout={"default"}
                data={images}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={height}
                renderItem={renderItem}
                onSnapToItem={(index) => setActiveSlide(index)}
            />
            <MyPagination data={images} activeSlide={activeSlide}/>
        </View>
    )
}

function MyPagination({ data, activeSlide }){
    return (
        <Pagination
            dotsLength={size(data)}
            activeDotIndex={activeSlide}
            containerStyle={styles.containerPagination}
            dotStyle={styles.dotActive}
            inactiveDotStyle={styles.dotInactive}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
        />
    )
}

const styles = StyleSheet.create({
    containerPagination:{
        backgroundColor: "transparent",
        zIndex: 1,
        position: "absolute",
        bottom:0,
        alignSelf:"center"
    },
    dotActive:{
        width:20,
        height:20,
        borderRadius: 10,
        marginHorizontal: 2,
        backgroundColor: "#2596be"
    },
    dotInactive:{
        width:14,
        height:14,
        borderRadius: 7,
        marginHorizontal: 2,
        backgroundColor: "#fff"
    },
})
