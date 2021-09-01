import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-easy-toast'


import AccountOptions from '../../components/account/AccountOptions'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import { getCurrentUser, closeSession } from '../../utils/actions'

export default function SettingsScreen() {

  const toastRef = useRef()

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("")
  const [user, setUser] = useState(getCurrentUser())

  const [reloadUser, setReloadUser] = useState(false)

  console.log("***************Datos Cuenta*************************", user)

  useEffect(() => {
    setUser(getCurrentUser())
    setReloadUser(false)
  }, [reloadUser])

  return (
    <View style={styles.container}>
      {
        user &&(
          <View>
            <InfoUser
              user={user}
              setLoading={setLoading}
              setLoadingText={setLoadingText}
            />
            <AccountOptions
              user={user}
              toastRef={toastRef}
              setReloadUser={setReloadUser}
            />
          </View>
        )
      
        }
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9"
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#df0024",
    borderBottomWidth: 1,
    borderBottomColor: "#df0024",
    paddingVertical: 10
  },
  btnCloseSessionTitle: {
    color: "#df0024"
  }
})