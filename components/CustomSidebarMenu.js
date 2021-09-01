import React from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { Avatar, Title, Caption, Drawer, Text }
  from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

import { closeSession, getCurrentUser } from '../utils/actions'

import BasicInfoUser from './account/BasicInfoUser'

const CustomSidebarMenu = (props) => {
 
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <DrawerContentScrollView {...props}>
        <BasicInfoUser/>
        <View style={stylesSidebar.profileHeaderLine} />
        <View style={stylesSidebar.drawerContent}>
          <Drawer.Section style={stylesSidebar.drawerSection}>
            <DrawerItemList {...props} />
          </Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app"
                color={color}
                size={size} />
            )}

            label={({ color }) =>
              <Text style={{ color: '#033249' }}>
                Cerrar Sesión
            </Text>
            }
            onPress={() => {
              props.navigation.toggleDrawer()
              Alert.alert(
                'Cerrar Sesión',
                'Estas seguro? Cerraras Sesión?',
                [
                  {
                    text: 'Cancelar',
                    onPress: () => {
                      return null
                    },
                  },
                  {
                    text: 'Confirmar',
                    onPress: () => {
                      closeSession()
                      props.navigation.replace('Auth')
                    },
                  },
                ],
                { cancelable: false },
              )
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  )
}


export default CustomSidebarMenu

const stylesSidebar = StyleSheet.create({
  drawerSection: {
    marginTop: 15,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#033249',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
})