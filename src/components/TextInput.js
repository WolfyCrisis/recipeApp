import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../theme/theme'

const TextInput = ({ errorText, description, ...props }) => (
    <View style={styles.container}>
        <Input
            style={styles.input}
            selectionColor={theme.colors.primary}
            underlineColor="transparent"
            mode="outlined"
            {...props}
        />
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: '85%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: theme.colors.surface,
    }
})

export default TextInput