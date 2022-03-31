import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface as PaperSurface } from 'react-native-paper'
import { theme } from '../theme/theme'

const Surface = ({ style, ...props }) => (
  <PaperSurface
    style={[
      styles.surface,
      { backgroundColor: theme.colors.surface },
      style,
    ]}
    {...props}
  />
)

const styles = StyleSheet.create({
  surface: {
    width: '90%',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 10,
    elevation: 10
  },
})

export default Surface