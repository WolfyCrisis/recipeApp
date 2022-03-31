import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

import {
    TextInput,
    Paragraph,
    Button,
    Loader
} from '../../components'
import { theme } from '../../theme/theme'

export default function RegisterScreen({ navigation }) {

    //Name, Email & Password useState
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Loading & ErrorText useState
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState('')

    
    function registerButton() {
        //Check empty text input
        if(!name) {
            setErrorText('Please fill in Name')
            return
        }
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
            name: name,
            email: email,
            password: password
        }

        //fetch Register API
        axios.post('user/register', data)
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
            <Loader loading={loading}/>

            <TextInput
                label="Name"
                onChangeText={(text) => setName(text)}
                returnKeyType="next"
            />

            <TextInput
                label="Email"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                returnKeyType="next"
            />

            <TextInput
                label="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                returnKeyType="done"
            />

            {errorText != '' ? (
                    <Paragraph style={{ color: 'red'}}>
                    {errorText}
                    </Paragraph>
                ) : null}
                
            <Button
                onPress={() => registerButton()}
                style={{ marginTop: 24 }}
            >
                Sign Up
            </Button>

            <View style={styles.row}>
                <Paragraph>Already have an account? </Paragraph>
                <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Paragraph style={styles.link}>Login</Paragraph>
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
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
})