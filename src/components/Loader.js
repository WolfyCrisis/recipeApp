import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Modal, Portal } from 'react-native-paper'

const Loader = (props) => {
    const {loading, ...attributes} = props
    
    return (
        <Portal>
            <Modal
                transparent={true}
                animationType={'fade'}
                visible={loading}
                onRequestClose={() => {
                console.log('close modal')
            }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={true}
                            color="green"
                            size="large"
                            style={styles.activityIndicator}
                        />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
})

export default Loader