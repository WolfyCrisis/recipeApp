import React, { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

import { Loader } from '../components'
import axios from 'axios'

export default function SplashScreen({ navigation }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        tokenVerify()
    }, [])

    const tokenVerify = async() => {
        let token = await SecureStore.getItemAsync('token')

        if(token === null) {
            navigation.replace('Login')
        } else {
            await axios.get('user/verifyToken', { 
                params: {
                    token
                }
            })
                .then((res) => {
                    setLoading(false)
                    navigation.replace('MainTab')
                })
                .catch((err) => {
                    if (err.code === 'ECONNABORTED') {
                        setLoading(false)
                        navigation.replace('Login')
                    } else {
                        setLoading(false)
                        console.log(err)
                        navigation.replace('Login')
                    }
                })
        }
    }

    return(
        <Loader loading={loading}/>
    )
}
