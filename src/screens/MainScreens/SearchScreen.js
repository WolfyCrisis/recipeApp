import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, StatusBar, View, ScrollView, TouchableOpacity } from 'react-native'
import { Searchbar, Card, Title, Menu, Portal, Modal, Divider } from 'react-native-paper'
import { Surface, Button, Paragraph, Loader } from '../../components'

import { RecipeTypesContext } from '../../contexts/RecipeTypesContext'

import axios from 'axios'

export default function SearchScreen() {
    const {
        types: [types],
        isLoading: [isLoading]
    } = useContext(RecipeTypesContext)

    const [query, setQuery] = useState('')
    const [type, setType] = useState('Breakfast')
    const [data, setData] = useState([])
    const [modalData, setModalData] = useState()

    const [menuVisible, setMenuVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
    })

    async function handleSearch() {
        setLoading(true)
        await axios.get('recipe/searchRecipe', {
            params: {
                name: query,
                type: type
            }
        })
            .then((res) => {
                setData(res.data)
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
    }

    return (
        <View style={styles.container}>
        <Loader loading={loading} />
            <Portal>
                <Modal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    contentContainerStyle={{
                        backgroundColor: 'white', width: '90%', height: '90%', alignSelf: 'center'
                    }}
                >
                    <ScrollView>
                        <Card>
                            <Card.Cover source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg' }}/>
                        </Card>
                        <Title>Name: {modalData ? modalData.name : null}</Title>
                        <Title>Type: {modalData ? modalData.type : null}</Title>
                        <Title>Description: {modalData ? modalData.desc : null}</Title>
                        <Divider/>
                        <Title>Ingredients</Title>
                        {
                            modalData ? modalData.ingredients.map((value) => {
                                return (
                                    <Paragraph>
                                        {value}
                                    </Paragraph>
                                )
                            })
                            : null
                        }
                        <Divider/>
                        <Title>Methods</Title>
                        {
                            modalData ? modalData.ingredients.map((value, idx) => {
                                return (
                                    <Paragraph>
                                        {idx}. {value}
                                    </Paragraph>
                                )
                            })
                            : null
                        }
                        <Button
                            onPress={() => setModalVisible(false)}
                        >
                            Close
                        </Button>
                    </ScrollView>
                </Modal>
            </Portal>
            <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
                <Surface style={{flex: 1}}>
                    <Searchbar
                        placeholder = 'Search'
                        onChangeText = {text => setQuery(text)}
                        onIconPress = {() => handleSearch()}
                        style={{width: '85%', marginTop: 10}}
                    />
                    <View>
                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={<Button onPress={() => setMenuVisible(true)}>Show menu</Button>}
                        >
                            {
                                !isLoading ?
                                    types.map((value, idx) => {
                                        return (
                                            <Menu.Item 
                                                key = {value+idx}
                                                onPress={() => {
                                                    setType(value)
                                                    setMenuVisible(false)
                                                }} 
                                                title={value} 
                                            />
                                        )
                                    })
                                : null
                            }
                        </Menu>
                    </View>
                    <Paragraph>
                        {type}
                    </Paragraph>
                </Surface>
            </View>
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Surface style={styles.surface}>
                        {
                            data.map((value, idx) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalData(data[idx])
                                            setModalVisible(true)
                                        }}
                                        style={{ width: '85%', justifyContent: 'center', marginVertical: 5}}
                                    >
                                        <Card key = {value+idx}>
                                            <Card.Cover source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg' }}/>
                                            <Card.Content>
                                                <Title>{value.name}</Title>
                                            </Card.Content>
                                        </Card>
                                    </TouchableOpacity>
                                )
                            })
                        }
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
    surface: {
        minHeight: 450
    }
})