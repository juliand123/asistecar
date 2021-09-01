import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { Button, Input } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

import CountryPicker from "react-native-country-picker-modal";
import MapView from "react-native-maps";
import { size, isEmpty } from "lodash";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import Spinner from "react-native-loading-spinner-overlay";

import Modal from "../../components/Modal";
import { getCurrentUser, addDocumentWithoutId } from "../../utils/actions";
import { getCurrentLocation } from "../../utils/helpers";
import Loading from "../Loading";
import { Alert } from "react-native";

export default function AddAssistanceForm({
  toastRef,
  setLoading,
  navigation,
}) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorObservations, setErrorObservations] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [brandsCollection, setBrandsCollection] = useState([]);
  const [brandReferencesCollection, setBrandReferencesCollection] = useState(
    ""
  );
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationAssistance, setLocationAssistance] = useState(null);
  const [GeneralLoading, setGeneralLoading] = useState(false);

  let years = {
    2021: "2021",
    2020: "2020",
    2019: "2019",
    2018: "2018",
    2017: "2017",
    2016: "2016",
    2015: "2015",
    2014: "2014",
    2013: "2013",
    2012: "2012",
    2011: "2011",
    2010: "2010",
    2009: "2009",
    2008: "2008",
    2007: "2007",
    2006: "2006",
    2005: "2005",
    2004: "2004",
    2003: "2003",
    2002: "2002",
    2001: "2001",
    2000: "2000",
    1999: "1999",
    1998: "1998",
    1997: "1997",
    1996: "1996",
    1995: "1995",
  };

  let brandLinesCollection = {
    Camioneta: "Camioneta",
    Automovil: "Automovil",
    Campero: "Campero",
  };

  useFocusEffect(
    useCallback(() => {
      defaultFormValues();
      console.log("prueba");
    }, [])
  );

  useEffect(() => {
    async function getBrandsFromApi() {
      //change for generic loading   setLoading(true)
      setGeneralLoading(true);
      try {
        let response = await fetch(
          "https://the-vehicles-api.herokuapp.com/brands/"
        );
        let json = await response.json();

        const dropDownBrand = json.map((element) => ({
          id: element.id,
          name: element.brand,
        }));
        setBrandsCollection(dropDownBrand);
        //console.log(brandsCollection)
      } catch (error) {
        console.log(error);
      }
      setGeneralLoading(false);
    }
    getBrandsFromApi();
  }, []);

  const getBrandReferences = async (brandId) => {
    setGeneralLoading(true);
    try {
      let response = await fetch(
        `https://the-vehicles-api.herokuapp.com/models?brandId=${brandId}`
      );
      let json = await response.json();
      const pickerBrandReferences = json.map((element) => ({
        id: element.id,
        name: element.model,
      }));
      setBrandReferencesCollection(pickerBrandReferences);
    } catch (error) {
      console.log("este es el", error);
    }
    setGeneralLoading(false);
  };

  const addAssistace = async () => {
    if (!validForm()) {
      return;
    }
    setLoading(true);
    const assistance = {
      brand: formData.brand,
      line: formData.line,
      reference: formData.reference,
      yearVehicle: formData.yearVehicle,
      phone: formData.phone,
      callingCode: formData.callingCode,
      address: formData.address,
      location: locationAssistance,
      observations: formData.observations,
      attendanceDate: null,
      createAt: new Date(),
      createBy: getCurrentUser().uid,
    };
    //console.log("objeto enviado", assistance)
    const responseAddDocument = await addDocumentWithoutId(
      "assistances",
      assistance
    );
    defaultFormValues();
    setLoading(false);

    if (!responseAddDocument.statusResponse) {
      toastRef.current.show(
        "Error al grabar la asistencia, por favor intente más tarde.",
        3000
      );
      return;
    }
    navigation.navigate("HomeScreen");
  };

  const clearErrors = () => {
    setErrorObservations(null);
    setErrorPhone(null);
    setErrorAddress(null);
  };
  const validForm = () => {
    console.log(
      "******************************************************entro marca  ",
      formData.brand
    )
    clearErrors();
    let isValid = true;
    if (isEmpty(formData.brand)) {
      isValid = false;
      Alert.alert("Marca", "Debe seleccionar la marca del vehículo.")
    }
    if (isEmpty(formData.line)) {
      isValid = false;
      Alert.alert("Linea", "Debe seleccionar la linea del vehículo.")
    }
    if (isEmpty(formData.reference)) {
      isValid = false;
      Alert.alert("Referencia", "Debe seleccionar la referencia del vehículo.")
    }
    if (isEmpty(formData.yearVehicle)) {
      isValid = false;
      Alert.alert("Modelo", "Debe seleccionar el modelo del vehículo.")
    }

    if (size(formData.phone) < 10) {
      setErrorPhone("Debes ingresar un teléfono de contacto válido...");
      isValid = false;
    }
    if (isEmpty(formData.observations)) {
      setErrorObservations("Debes ingresar la descripción de la falla...");
      isValid = false;
    }

    if (!locationAssistance) {
      toastRef.current.show(
        "Debes de localizar el lugar para la asistencia en el mapa.",
        3000
      );
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      {/* <Spinner
          visible={GeneralLoading}
          textContent={'Cargando...'}
          textStyle={styles.spinnerTextStyle}
        /> */}
      <Loading isVisible={GeneralLoading} text="Cargando" />

      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorObservations={errorObservations}
        errorPhone={errorPhone}
        errorAddress={errorAddress}
        setIsVisibleMap={setIsVisibleMap}
        locationAssistance={locationAssistance}
        brandsCollection={brandsCollection}
        brandLinesCollection={brandLinesCollection}
        brandReferencesCollection={brandReferencesCollection}
        getBrandReferences={getBrandReferences}
        years={years}
      />
      <Button
        title="Solicitar Asistencia"
        onPress={addAssistace}
        buttonStyle={styles.btnAddAssistance}
      />
      <MapAssistance
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationAssistance={setLocationAssistance}
        toastRef={toastRef}
      />
    </KeyboardAwareScrollView>
  );
}

function FormAdd({
  formData,
  setFormData,
  errorAddress,
  errorObservations,
  errorPhone,
  setIsVisibleMap,
  locationAssistance,
  brandsCollection,
  brandLinesCollection,
  brandReferencesCollection,
  years,
  getBrandReferences,
}) {
  const [country, setCountry] = useState("CO");
  const [callingCode, setCallingCode] = useState("57");
  const [selectedBrandValue, setSelectedBrandValue] = useState("");
  const [selectedValueLine, setSelectedValueLine] = useState("");
  const [selectedValueReference, setSelectedValueReference] = useState("");
  const [selectedValueYearVehicle, setSelectedValueYearVehicle] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.viewForm}>
      <View style={styles.container}>
        <View
          style={{
            // The solution: Apply zIndex to any device except Android
            ...(Platform.OS !== "android" && {
              zIndex: 10,
            }),
          }}
        >
          <View>
            <Text style={styles.paragraph}>Marca Vehículo:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedBrandValue}
                style={{ height: 40, width: 350 }}
                onValueChange={(item, index) => {
                  setSelectedBrandValue(item);
                  console.log(brandsCollection[index].id);
                  getBrandReferences(brandsCollection[index-1].id);
                  setFormData({
                    ...formData,
                    brand: item,
                  });
                }}
              >
                <Picker.Item
                  key={"unselectable"}
                  label="Seleccione la marca"
                  value={0}
                />
                {brandsCollection !== "" ? (
                  brandsCollection.map((brand) => {
                    return (
                      <Picker.Item
                        key={brand.id}
                        label={brand.name}
                        value={brand.name}
                      />
                    );
                  })
                ) : (
                  <Picker.Item label="Loading..." value="0" />
                )}
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.paragraph}>Línea:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValueLine}
                style={{ height: 50, width: 350, textAlign: "center" }}
                onValueChange={(item) => {
                  setSelectedValueLine(item);
                  console.log(item);
                  setFormData({
                    ...formData,
                    line: item,
                  });
                }}
              >  
                <Picker.Item
                    label="Seleccione la linea del vehículo..."
                    value="0"
                  />
                {Object.keys(brandLinesCollection).map((key) => {
                  return <Picker.Item key={key} label={key} value={key} />;
                })}
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.paragraph}>Referencia:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValueReference}
                style={{ height: 40, width: 350 }}
                onValueChange={(item, index) => {
                  setSelectedValueReference(item);
                  setFormData({
                    ...formData,
                    reference: item,
                  });
                }}
              >
                   <Picker.Item
                    label="Seleccione la referencia del vehículo..."
                    value="0"
                  />
                {brandReferencesCollection !== "" ? (
                  brandReferencesCollection.map((line) => {
                    return (
                      <Picker.Item
                        key={line.id}
                        label={line.name}
                        value={line.name}
                      />
                    );
                  })
                ) : (
                  <Picker.Item
                    label="Cargando referencias de vehículos..."
                    value="0"
                  />
                )}
              </Picker>
            </View>
          </View>

          <View>
            <Text style={styles.paragraph}>Modelo:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedValueYearVehicle}
                style={{ height: 50, width: 350, textAlign: "center" }}
                onValueChange={(item) => {
                  setSelectedValueYearVehicle(item);
                  console.log(item);
                  setFormData({
                    ...formData,
                    yearVehicle: item,
                  });
                }}
              >
                <Picker.Item
                  key={"unselectable"}
                  label="Seleccione el Año"
                  value={0}
                />
                {Object.keys(years).map((key) => {
                  return <Picker.Item key={key} label={key} value={key} />;
                })}
              </Picker>
            </View>
          </View>
          <View style={styles.viewObservations}>
            <Text style={styles.paragraph}>
              Describa el problema que presenta tu vehículo:
            </Text>
            <Input
              placeholder="Describe la falla de tu vehículo..."
              containerStyle={styles.input}
              style={styles.textArea}
              multiline
              defaultFormValues={formData.observations}
              onChange={(e) => onChange(e, "observations")}
              errorMessage={errorObservations}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.paragraph}>Número de contacto:</Text>
            <View style={styles.phoneView}>
              <CountryPicker
                withFlag
                withCallingCode
                withFilter
                withCallingCodeButton
                containerStyle={styles.countryPicker}
                countryCode={country}
                onSelect={(country) => {
                  setFormData({
                    ...formData,
                    country: country.cca2,
                    callingCode: country.callingCode[0],
                  });
                  setCountry(country.cca2);
                  setCallingCode(country.callingCode[0]);
                }}
              />
              <Input
                placeholder="WhatsApp ó número de contacto inmediato"
                keyboardType="phone-pad"
                containerStyle={styles.inputPhone}
                defaultFormValues={formData.phone}
                onChange={(e) => onChange(e, "phone")}
                errorMessage={errorPhone}
              />
            </View>
          </View>
        </View>
        <Input
          placeholder="Dirección de la emergencia..."
          defaultFormValues={formData.address}
          onChange={(e) => onChange(e, "address")}
          errorMessage={errorAddress}
          rightIcon={{
            type: "material-community",
            name: "google-maps",
            color: locationAssistance ? "#df0024" : "#c2c2c2",
            onPress: () => setIsVisibleMap(true),
          }}
        />
      </View>
    </View>
  );
}

function MapAssistance({
  isVisibleMap,
  setIsVisibleMap,
  setLocationAssistance,
  toastRef,
}) {
  const [newRegion, setNewRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationAssistance(newRegion);
    toastRef.current.show("Localización guardada correctamente.", 3000);
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {newRegion && (
          <MapView
            style={styles.mapStyle}
            initialRegion={newRegion}
            showsUserLocation={true}
            onRegionChange={(region) => setNewRegion(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar Ubicación"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
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
  );
}

const defaultFormValues = () => {
  return {
    observations: "",
    address: "",
    phone: "",
    email: "",
    country: "CO",
    callingCode: "57",
  };
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#3465f0",
  },
  pickerContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 10,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "left",
    color: "#e7240e",
  },
  viewObservations: {
    marginTop: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  phoneView: {
    width: "80%",
    flexDirection: "row",
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a65273",
  },
  viewMapBtnSave: {
    backgroundColor: "#df0024",
  },
  mapStyle: {
    width: "100%",
    height: 550,
  },
  viewForm: {
    marginHorizontal: 10,
  },
  btnAddAssistance: {
    width: "50%",
    marginTop: 10,
    marginEnd: 10,
    marginLeft: 100,
    marginRight: 10,
    backgroundColor: "#e7240e",
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  headingText: {
    padding: 8,
  },
});
