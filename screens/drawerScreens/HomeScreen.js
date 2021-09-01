import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Image } from "react-native";


export default function HomeScreen() {

  const [brandLinesCollection, setBrandLinesCollection] = useState([])
  const [brandsCollection2, setBrandsCollection2] = useState([])
  const [selectedBrandValue, setSelectedBrandValue] = useState("");
  const [selectedValueLine, setSelectedValueLine] = useState("");


  const getBrandLines = async (brandId) => {
    try {
      let response = await fetch(
        `https://the-vehicles-api.herokuapp.com/models?brandId=${brandId}`
      )
      let json = await response.json()
      const dropDownBrandLines = json.map(element => ({
        id: element.id,
        name: element.model
      }))
      setBrandLinesCollection(dropDownBrandLines)
      // console.log("Coleccion de Modelos: ", brandLinesCollection)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getBrandsFromApi() {
      try {
        let response = await fetch(
          "https://the-vehicles-api.herokuapp.com/brands/"
        )
        let json = await response.json()
        const dropDownBrand2 = json.map(element => ({
          id: element.id,
          name: element.brand
        }))

        setBrandsCollection2(dropDownBrand2)
      } catch (error) {
        console.log(error)
      }
    }
    getBrandsFromApi()
  }, [])



//   return (
//     <View style={styles.container}>
//       <Picker
//         selectedValue={selectedBrandValue}
//         style={{ height: 50, width: 350, textAlign: "center" }}
//         onValueChange={(item, index) => {
//           setSelectedBrandValue(item) //,
//           console.log(selectedBrandValue),
         
//          getBrandLines((brandsCollection2[index]).id)
//         }}
//       >
//         {brandsCollection2 !== "" ? (
//           brandsCollection2.map(brand => {
//             return <Picker.Item key={brand.id} label={brand.name} value={brand.name} />
//           })
//         ) : (
//           <Picker.Item label="Loading..." value="0" />
//         )}
//       </Picker>
//       <Picker
//         selectedValue={selectedValueLine}
//         style={{ height: 50, width: 350, textAlign: "center" }}
//         onValueChange={(item) => {
//           setSelectedValueLine(item)
//         }
//         }
//       >
//         {brandLinesCollection !== "" ? (
//           brandLinesCollection.map(line => {
//             return <Picker.Item key={line.id} label={line.name} value={line.name} />
//           })
//         ) : (
//           <Picker.Item label="Loading..." value="0" />
//         )}
//       </Picker>
//     </View>

//   )
// }

return(
  <View style={styles.principalView}>
    <Image source={require('../../assets/roundedlogo.png')} />
  </View>
)}

const styles = StyleSheet.create({
  container: {   
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  principalView:{
    height: '100%',
    backgroundColor: '#033249',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

