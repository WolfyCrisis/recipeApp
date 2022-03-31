import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native'
import { Card, List, RadioButton } from 'react-native-paper'
import { TextInput, Button, Surface, Paragraph, Loader } from '../../components'

import { RecipeTypesContext } from '../../contexts/RecipeTypesContext'

import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export default function AddRecipeScreen() {
    const {
        types: [types],
        isLoading: [isLoading]
    } = useContext(RecipeTypesContext)

    const [name, setName] = useState('')
    const [type, setType] = useState('Breakfast')
    const [desc, setDesc] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [method, setMethod] = useState('')

    const [ingredientList, setIngredientList] = useState([])
    const [methodList, setMethodList] = useState([])

    const [expanded, setExpanded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState('')

    useEffect(() => {

    })

    function addText(text, type) {
        if (type === 'ingredient') {
            setIngredientList(arr => [...arr, text])
        } else {
            setMethodList(arr => [...arr, text])
        }
    }

    function removeText(type) {
        if (type === 'ingredient') {
            ingredientList.pop()
            setIngredientList(arr => [...arr])
        } else {
            methodList.pop()
            setMethodList(arr => [...arr])
        }
    }

    async function createRecipe() {
        if (!name || !desc || ingredientList.length === 0 || methodList === 0) {
            setErrorText('Please fill in all the information.')
            return
        }
        setLoading(true)

        const body = {
            name, 
            type, 
            desc, 
            ingredients: ingredientList,
            methods: methodList
        }

        await SecureStore.getItemAsync('token')
            .then(async(token) => {
                await axios.post('recipe/addRecipe', body, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        setErrorText(res.data)
                        setName('')
                        setDesc('')
                        setIngredient('')
                        setIngredientList([])
                        setMethod('')
                        setMethodList([])
                        setLoading(false)
                    })
                    .catch((err) => {
                        if (err.code === 'ECONNABORTED') {
                            setErrorText('Timeout')
                            setLoading(false)
                        } else {
                            console.error(err.response.data)
                            setErrorText(res)
                            setLoading(false)
                        }
                    })
            })
    }

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <View style={{flex: 0.6, alignItems: 'center', zIndex: 2}}>
                <Card style={{ width: '100%', height: '100%', justifyContent: 'center'}}>
                    <Card.Cover source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg' }}/>
                    <Card.Actions>
                        <View>
                            <Button
                                onPress = {() => createRecipe()}
                            >
                                Create
                            </Button>
                        </View>
                        {errorText != '' ? (
                            <Paragraph style={{ color: 'red' }}>
                                {errorText}
                            </Paragraph>
                        ) : null
                        }
                    </Card.Actions>
                </Card>
            </View>
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Surface>
                        <TextInput
                            label = 'Name'
                            placeholder = 'Food name here'
                            value = {name}
                            onChangeText = {text => setName(text)}
                        />
                        <List.Section style={{width: '100%'}}>
                            <List.Accordion
                                title = {!isLoading ? type : 'Food Types'}
                                left = {props => <List.Icon {...props} icon="food" />}
                                expanded={expanded}
                                onPress={expand => setExpanded(expand)}
                            >
                                <RadioButton.Group onValueChange={value => setType(value)} value={type}>
                                    {
                                        !isLoading ?
                                            types.map((value, idx) => {
                                                return (
                                                    <RadioButton.Item
                                                        key = {value+idx}
                                                        label = {value}
                                                        value = {value}
                                                    />
                                                )
                                            })
                                        : null
                                    }
                                </RadioButton.Group>
                            </List.Accordion>
                        </List.Section>
                        <TextInput
                            label = 'Description'
                            placeholder = 'Food description here'
                            value = {desc}
                            multiline = {true}
                            numberOfLines = {5}
                            onChangeText = {text => setDesc(text)}
                        />
                    </Surface>
                    <Surface>
                        <List.Section style={{width: '100%'}}>
                            <List.Subheader>
                                Ingredients
                            </List.Subheader>
                            {
                                ingredientList.map((value, idx) => {
                                    return (
                                        <List.Item
                                            key = {'I'+idx} 
                                            title = {value}
                                            left = {props => <List.Icon {...props} icon = 'star-four-points'/>}
                                        />
                                    )
                                })
                            }
                        </List.Section>
                        <TextInput
                            label = 'Ingredient'
                            placeholder = 'Put ingredient here'
                            value = {ingredient}
                            onChangeText = {text => setIngredient(text)}
                        />
                        <View style={styles.rowButton}>
                            <View>
                                <Button
                                    disabled = {ingredient === '' ? true : false}
                                    onPress = {() => {
                                        addText(ingredient, 'ingredient')
                                        setIngredient('')
                                    }}
                                >
                                    add    
                                </Button>
                            </View>
                            <View>
                                <Button
                                    disabled = {ingredientList.length == 0 ? true : false}
                                    onPress = {() => removeText('ingredient')}
                                >
                                    remove    
                                </Button>
                            </View>
                        </View>
                    </Surface>
                    <Surface>
                        
                        <List.Section style={{width: '100%'}}>
                            <List.Subheader>
                                Methods
                            </List.Subheader>
                            {
                                methodList.map((value, idx) => {
                                    return (
                                        <List.Item 
                                            key = {'M'+idx} 
                                            description = {`${idx+1}. ${value}`}
                                            descriptionNumberOfLines = {4}
                                        />
                                    )
                                })
                            }
                        </List.Section>
                        <TextInput
                            label = 'Method'
                            placeholder = 'Put method here'
                            value = {method}
                            multiline = {true}
                            numberOfLines = {5}
                            onChangeText = {text => {
                                setMethod(text)
                            }}
                        />
                        <View style={styles.rowButton}>
                            <View>
                                <Button
                                    disabled = {method === '' ? true : false}
                                    onPress = {() => {
                                        addText(method, 'method')
                                        setMethod('')
                                    }}
                                >
                                    add    
                                </Button>
                            </View>
                            <View>
                                <Button
                                    disabled = {methodList.length == 0 ? true : false}
                                    onPress = {() => removeText('method')}
                                >
                                    remove    
                                </Button>
                            </View>
                        </View>
                    </Surface>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    rowButton: {
        flexDirection: 'row'
    }
})