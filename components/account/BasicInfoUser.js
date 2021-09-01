import React, { useState, useEffect } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { Avatar, Title, Caption }
    from 'react-native-paper'

import { closeSession, getCurrentUser } from '../../utils/actions'
import { size } from 'lodash'


export default function BasicInfoUser() {

    const [user, setUser] = useState(getCurrentUser())
    useEffect(() => {
        setUser(getCurrentUser())
    }, [])

    return (
        <View style={stylesSidebar.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15, paddingLeft: "25%" }}>
                <Avatar.Image
                    source={
                        user.photoURL
                            ? { uri: user.photoURL }
                            : require("../../assets/avatar-default.jpg")
                    }
                    size={80}
                />
            </View>
            <View style={stylesSidebar.row}>
            </View>
            <View style={{ marginLeft: 5, flexDirection: 'column' }}>
                <Title style={stylesSidebar.title}>
                    {
                        size(user.displayName) > 0
                            ? `${user.displayName.substr(0, 20)}...`
                            : "Anónimo"
                    }
                </Title>
                <Caption style={stylesSidebar.caption}>
                    {
                        size(user.email) > 0
                            ? `${user.email.substr(0, 60)}...`
                            : "Anónimo"
                    }
                </Caption>
            </View>
        </View>
    )
}

const stylesSidebar = StyleSheet.create({

    userInfoSection: {
        paddingLeft: 20,
    }
})