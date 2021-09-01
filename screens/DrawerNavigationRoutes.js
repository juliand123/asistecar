import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from './drawerScreens/HomeScreen'
import SettingsScreen from './drawerScreens/SettingsScreen'
import GaragesScreen from './drawerScreens/GaragesScreen'
import AddGarage from '../screens/garages/AddGarage'
import Garage from '../screens/garages/Garage'
import MechanicsScreen from './drawerScreens/MechanicsScreen'
import AddMechanic from '../screens/mechanics/AddMechanic'
import AssistanceScreen from './drawerScreens/AssistanceScreen'
import MechanicalTipsScreen from './drawerScreens/MechanicalTipsScreen'
import CareModule from './drawerScreens/CareModuleScreen'
import CustomSidebarMenu from '../components/CustomSidebarMenu'
import NavigationDrawerHeader from '../components/NavigationDrawerHeader'
import Mechanic from '../components/mechanics/Mechanic'
import MechanicalTip from './mechanicalTips/MechanicalTip'



const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff8038',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  )
}

const garagesScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="GaragesScreen"
      screenOptions={{
        gestureEnabled: true,
        headerRight: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#ff8038',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="GaragesScreen"
        component={GaragesScreen}
        options={{
          title: 'Talleres',
        }}
      />

      <Stack.Screen
        name="AddGarage"
        component={AddGarage}
        options={{
          title: 'Crear Taller',
        }}
      />
      <Stack.Screen
        name="Garage"
        component={Garage}
        options={{
          title: 'Ver Taller',
        }}
      />



    </Stack.Navigator>
  )
}

const mechanicsScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="MechanicsScreen"
      screenOptions={{
        gestureEnabled: true,
        headerRight: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#ff8038',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="MechanicsScreen"
        component={MechanicsScreen}
        options={{
          title: 'Mecánicos',
        }}
      />
      <Stack.Screen
        name="AddMechanic"
        component={AddMechanic}
        options={{
          title: 'Crear Mecánico',
        }}
      />
        <Stack.Screen
        name="Mechanic"
        component={Mechanic}
        options={{
          title: 'Ver Mecánico',
        }}
      />
    </Stack.Navigator>
  )
}

const assistanceScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="AssistanceScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#ff8038',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="AssistanceScreen"
        component={AssistanceScreen}
        options={{
          title: 'Asistencia 24/7',
        }}
      />
    </Stack.Navigator>
  )
}

const mechanicalTipsScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="MechanicalTipsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#ff8038',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="MechanicalTipsScreen"
        component={MechanicalTipsScreen}
        options={{
          title: 'Tips Mecánicos',
        }}
      />
      <Stack.Screen
        name="MechanicalTip"
        component={MechanicalTip}
        options={{
          title: 'Ver Mecánicos',
        }}
      />
    </Stack.Navigator>
  )
}

const careModuleScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="CareModule"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#ff8038',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="CareModule"
        component={CareModule}
        options={{
          title: 'Módulo de Cuidado',
        }}
      />
    </Stack.Navigator>
  )
}

const settingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#ff8038',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Cuenta',
        }}
      />
    </Stack.Navigator>
  )
}


const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#ff8038',
        color: '#cee1f2',
        itemStyle: { marginVertical: 5, color: 'white' },
        labelStyle: {
          color: '#033249',
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{
          drawerLabel: 'Inicio',
          drawerIcon: config => <Icon
            size={23}
            color='#e7240e'
            name="home-outline"></Icon>
        }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="garagesScreenStack"
        options={{
          drawerLabel: 'Talleres',
          drawerIcon: config => <Icon
            size={23}
            color='#e7240e'
            name="home-analytics"></Icon>
        }}
        component={garagesScreenStack}
      />
      <Drawer.Screen
        name="mechanicsScreenStack"
        options={{
          drawerLabel: 'Mecánicos',
          drawerIcon: config => <Icon
            size={23}
            color='#e7240e'
            name="account-star"></Icon>
        }}
        component={mechanicsScreenStack}
      />
      <Drawer.Screen
        name="assistanceScreenStack"
        options={{
          drawerLabel: 'Asistencia 24/7',
          drawerIcon: config => <Icon
            size={23}
            color='#e7240e'
            name="map-marker-multiple"></Icon>
        }}
        component={assistanceScreenStack}
      />
      <Drawer.Screen
        name="mechanicalTipsScreenStack"
        options={{
          drawerLabel: 'Tips Mecánicos',
          drawerIcon: config => <Icon
            size={23}
            color='#e7240e'
            name="cellphone-information"></Icon>
        }}
        component={mechanicalTipsScreenStack}
      />
      <Drawer.Screen
        name="careModuleScreenStack"
        options={{
          drawerLabel: 'Módulo de Cuidado',
          drawerIcon: config => <Icon
            size={23}
            color='#e7240e'
            name="bottle-tonic-plus-outline"></Icon>
        }}
        component={careModuleScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{
          drawerLabel: 'Cuenta',
          drawerIcon: config => <Icon
            size={23}
            color='#e7240e'
            name="account-cog"></Icon>
        }}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigatorRoutes