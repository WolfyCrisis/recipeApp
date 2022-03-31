import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import {
    Paragraph,
    TextInput,
    Button,
    Loader
} from '../../components'
import { theme } from '../../theme/theme'

export default function LoginScreen({ navigation }) {

    //Email & Password useState
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Loading & ErrorText useState
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState('')
    
    function loginButton() {
        //Check empty text input
        if(!email) {
            setErrorText('Please fill in Email')
            return
        }
        if(!password) {
            setErrorText('Please fill in Password')
            return
        }
        setLoading(true)
        
        const data = {
            email: email,
            password: password
        }

        //Fetch Login API
        axios.post('user/login', data)
            .then(async(res) => {
                await SecureStore.setItemAsync('token', res.data.accessToken)
                setLoading(false)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainTab' }]
                })
            })
            .catch((err) => {
                if (err.code === 'ECONNABORTED') {
                    setErrorText('Timeout')
                    setLoading(false)
                } else {
                    setErrorText(err.response.data)
                    setLoading(false)
                }
            })
    }

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <TextInput
                label = 'Email'
                onChangeText = {(text) => setEmail(text)}
                keyboardType = 'email-address'
                returnKeyType = 'next'
            />
            <TextInput
                label = 'Password'
                onChangeText = {(text) => setPassword(text)}
                secureTextEntry = {true}
                returnKeyType = 'done'
            />
            {errorText != '' ? (
                <Paragraph style={{ color: 'red' }}>
                    {errorText}
                </Paragraph>
            ) : null
            }
            <Button onPress={() => loginButton()}>
                Login
            </Button>
            <View style={styles.row}>
                <Paragraph>Don’t have an account? </Paragraph>
                <TouchableOpacity onPress={() => navigation.replace('Register')}>
                    <Paragraph style={styles.link}>Sign up</Paragraph>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})