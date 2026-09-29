import React, { useState } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../styles/common'
import { colors } from '../styles/theme'
import { styles } from '../styles/LabelPickerModal.styles'
import { Labels } from '../constants/labelset'
import { IconComponent } from './appIcon'

const LabelPickerModal = ({onClose, onDone, selectedLabels} : {
  onClose: ()=> void,
  onDone: (ids: string[]) => void,
  selectedLabels: string[]
}) => {
  const [seletedIds, setSeletedIds] = useState<string[]>(selectedLabels);

  const toggleLabel = (id: string) => {
    setSeletedIds((prev) => {
      return prev.includes(id) ? prev.filter((seletedId) => seletedId !== id) : [...prev, id]
    })    
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[common.panel, styles.sheet]}>
            <View style={styles.handle} />
            <View style={common.buttonRow}>
              <TouchableOpacity onPress={onClose}>
                <Text style={[common.label, { color: colors.primary }]}>Cancel</Text>
              </TouchableOpacity>
              <Text style={[common.label, styles.title]}>Select Labels</Text>
              <TouchableOpacity onPress={() => onDone(seletedIds)}>
                <Text style={[common.label, { color: colors.success }]}>Done ({seletedIds.length})</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder='Search labels...'
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <Text style={styles.sectionTitle}>All Labels</Text>
            <View style={styles.chipGrid}>
              {
                Labels.map((label) => {
                  const isSelected = seletedIds.includes(label.id)
                  return(
                    <TouchableOpacity
                      key={label.id}
                      // 8-digit hex: label color at ~10% opacity for the soft tint
                      style={[
                        styles.chip,
                        { backgroundColor: `${label.color}1A` },
                        isSelected && styles.chipSelected,
                      ]}
                      onPress={() => toggleLabel(label.id)}
                    >
                      <IconComponent  icon={label.icon} color={label.color}/>
                      <Text style={[styles.chipText, { color: label.color }]}>{label.name}</Text>
                      {isSelected && (
                        <View style={styles.checkBadge}>
                          <Ionicons name="checkmark" size={14} color={colors.onPrimary} />
                        </View>
                      )}
                    </TouchableOpacity>
                  )
                })
              }
            </View>
        </View>
      </View>
    </Modal>
  )
}

export default LabelPickerModal