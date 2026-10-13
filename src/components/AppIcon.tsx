import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { IconsSet } from '../constants/iconset'

export const iconSet = {Ionicons, MaterialIcons, FontAwesome5, Feather, SimpleLineIcons, MaterialCommunityIcons, FontAwesome, Entypo}

export const IconComponent = ({icon, color, size = 22}: {
  icon: string,
  color?: string,
  size?: number
}) => {
  const currentIcon = IconsSet.filter((item) => item.id === icon)[0]
  const Component = iconSet[currentIcon.set]
  // lineHeight = size keeps the glyph vertically centered next to text
  return <Component name={currentIcon.name} color={color} size={size} style={{ lineHeight: size }} />
}