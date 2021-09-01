import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { size } from 'lodash'
import React from 'react'
import { Icon } from 'react-native-elements'

export default function MechanicalTips({ navigation }) {
    const tips = [
        {title: "Tanque de la gasolina", description: "Debemos tener especial cuidado con el tanque de la gasolina, sobre todo cuando se trata de coches antiguos. El depósito de combustible tiende a ensuciarse por la gasolina que a veces entra con residuos desde los dispensadores. Poco a poco, sin darnos cuenta, el tanque se va llenando de este sucio y, aunque hay filtros que impiden el paso de estos hacia la bomba, estos filtros se pueden tapar, generando que no le llegue suficiente combustible a la bomba, alterando el normal funcionamiento de nuestro coche. Es en ese momento que comienzan las fallas, inclusive, pudieran dañar la bomba y afectar seriamente a los inyectores.", iconName: "fuel" },
        {title: "Bomba del aceite", description: "Es otro de los detalles que debemos tomar en cuenta, sobre todo si somos de las personas que utilizamos nuestro coche hasta para ir a la bodega o tienda que nos queda a media cuadra. Los recorridos cortos afectan la bomba del aceite, recordemos que esta tarda cierto tiempo, cuando encendemos nuestro coche, para lubricar todas las partes del motor. Cuando realizamos recorridos cortos no le damos el tiempo suficiente a la bomba de realizar su trabajo, algo que a la larga pudiera traer ciertos inconvenientes a nuestro motor.", iconName: "oil" },
        {title: "Neumáticos", description: "Tómate la costumbre de revisar los neumáticos al salir de tu casa. Si notas algún inconveniente en alguno de ellos podrás resolverlo en el garaje o en la gomería más cercana. Conoce cuál es la presión de aire adecuada de los neumáticos y mantenla siempre constante.", iconName: "car-limousine" },
        {title: "Batería", description: "Revisá la batería de tu auto una vez al año. Es uno de los elementos más importantes de tu coche y, si tiene una falla, tu coche no arrancará hagas lo que hagas. Si la batería falla, no desesperes. Llamá a tu aseguradora y ellos enviarán una grúa y sabrán qué hacer para que tu coche vuelva a estar en movimiento lo antes posible.", iconName: "car-battery" },
        {title: "Luces", description: "Antes de arrancar tu auto, verifica las luces direccionales, de freno y retroceso. Asegúrate de que estén a la altura correcta para evitar que emitan la luz en una angulación inadecuada y limpia los faros para que tengas una mejor iluminación.", iconName: "lightbulb-on-outline" }
    ]

    const handleLoadMore = async() =>{
        console.log("handleLoadMore")
        // if (!startGarage) {
        //     return
        // }
        // setLoading(true)
        // const response = await getMoreGarages(limitGarages, startGarage)
        //     if (response.statusResponse) {
        //         setStartGarage(response.startGarage)
        //         setGarages([...garages, ...response.garages])
        //     }
        // setLoading(false)
    }

    return (
        <View>
            <FlatList
                data={tips}
                //unique key
                keyExtractor={(item, index) => index.toString()}
                //reach 50% load more
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem={(tip) => (
                    <MechanicalTipItem
                        tip={tip}
                        navigation={navigation}
                    />
                )}
            />
        </View>
    )
}

function MechanicalTipItem({ tip, navigation }){
    const { title, description, iconName } = tip.item
    // const imageGarage = images[0]
    
    const goMechanicalTip = () => {
        console.log("goMechanicalTip", title, description)
        navigation.navigate("MechanicalTip", { title, description, iconName })
    }
    return (
        <TouchableOpacity onPress={goMechanicalTip}>
            <View style={styles.viewMechanicalTip}>
                <View style={styles.viewGarageImage}>
                    <Icon
                        type="material-community"
                        name={iconName}
                        color="#e7240e"
                        reverse
                        size={25}
                        containerStyle={styles.btnContainer}
                        //onPress={() => navigation.navigate('MechanicalTip', title)}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
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
    viewMechanicalTip:{
        flex: 1,
        flexDirection: "row",
        borderRadius: 10,
        borderColor: "#c2c2c2",
        borderWidth: 1,
        margin: 8,
        shadowColor:"black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    },
    title:{
        fontWeight:"bold"
    },
    description:{
        width:"70%",
    },
})
