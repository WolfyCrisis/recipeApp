import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, View, ScrollView } from 'react-native'
import { Paragraph, Button, Loader } from '../../components'

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export default function AccountSceen({navigation}) {
    const [profile, setProfile] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProfile()
        
    }, [])

    async function fetchProfile() {
        setLoading(true)
        await SecureStore.getItemAsync('token')
            .then((token) => {
                axios.get('user/getUserProfile', {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                })
                    .then((res) => {
                        setProfile(res.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        if (err.code === 'ECONNABORTED') {
                            setErrorText('Timeout')
                            setLoading(false)
                        } else {
                            console.error(err)
                            setLoading(false)
                        }
                    })
            })
    }

    async function logOutButton() {
        await SecureStore.deleteItemAsync('token')
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        })
    }

    return (
        <View style={styles.container}>
        <Loader loading={loading} />
            <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
                <Paragraph>
                    {profile ? profile.name : null}, {profile ? profile.email : null}
                </Paragraph>
                <Button
                    onPress = {() => logOutButton()}
                >
                    Log Out
                </Button>
            </View>
            <ScrollView style={{flex: 1}}>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    }
})