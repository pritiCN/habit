import React from 'react'
import { Icon } from '../constants/iconset'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const iconSet = {Ionicons, MaterialIcons, FontAwesome5, Feather, SimpleLineIcons}

export const IconComponent = ({icon, color, size = 22}: {
  icon: Icon,
  color?: string,
  size?: number
}) => {
  const Component = iconSet[icon.set]
  // lineHeight = size keeps the glyph vertically centered next to text
  return <Component name={icon.name} color={color} size={size} style={{ lineHeight: size }} />
}