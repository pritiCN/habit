import React, { useState } from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../styles/common'
import { colors } from '../styles/theme'
import { styles } from '../styles/LabelPickerModal.styles'
import { inputStyles } from '../styles/input.styles'
import { IconComponent } from './appIcon'
import { useHabits } from '../context/HabitsContext'
import LabelForm from './LabelForm'
import { useLabel } from '../context/LabelContext'

const LabelPickerModal = ({onClose, onDone, selectedLabels} : {
  onClose: ()=> void,
  onDone: (ids: string[]) => void,
  selectedLabels: string[]
}) => {
  const [seletedIds, setSeletedIds] = useState<string[]>(selectedLabels);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<'pick' | 'create'>('pick')

  const toggleLabel = (id: string) => {
    setSeletedIds((prev) => {
      return prev.includes(id) ? prev.filter((seletedId) => seletedId !== id) : [...prev, id]
    })    
  }
  const {getColor} = useHabits();
  const {searchLabels} = useLabel();
  
  const filteredLabels = searchLabels(search) 

  const setIsCreating = () => {
    setMode('pick');
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
            {
              mode === 'create' ? (
                <LabelForm 
                  onCancel={setIsCreating}
                />
              ) : (
                <>
                  <View style={common.buttonRow}>
                    <TouchableOpacity onPress={onClose}>
                      <Text style={[common.label, { color: colors.primary }]}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={[common.label, common.headerTitle]}>Select Labels</Text>
                    <TouchableOpacity onPress={() => onDone(seletedIds)}>
                      <Text style={[common.label, { color: colors.success }]}>Done ({seletedIds.length})</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={inputStyles.searchBar}>
                    <Ionicons name="search" size={18} color={colors.textMuted} />
                    <TextInput
                      style={inputStyles.searchInput}
                      placeholder='Search labels...'
                      placeholderTextColor={colors.textMuted}
                      value={search}
                      onChangeText={setSearch}
                    />
                  </View>

                  <Text style={styles.sectionTitle}>All Labels</Text>
                  <View style={styles.chipGrid}>
                    {
                      filteredLabels.map((label) => {
                        const isSelected = seletedIds.includes(label.id)
                        const colorCode = getColor(label.colorId)
                        return(
                          <TouchableOpacity
                            key={label.id}
                            // 8-digit hex: label color at ~10% opacity for the soft tint
                            style={[
                              styles.chip,
                              { backgroundColor: `${colorCode}1A` },
                              isSelected && styles.chipSelected,
                            ]}
                            onPress={() => toggleLabel(label.id)}
                          >
                            <IconComponent  icon={label.icon} color={colorCode}/>
                            <Text style={[styles.chipText, { color: getColor(label.colorId, true) }]}>{label.name}</Text>
                            {isSelected && (
                              <View style={styles.checkBadge}>
                                <Ionicons name="checkmark" size={14} color={colors.onPrimary} />
                              </View>
                            )}
                          </TouchableOpacity>
                        )
                      })
                    }
                    {
                      filteredLabels.length === 0 && (
                        <Text style={{ color: colors.textMuted }}>No labels found</Text>
                      )
                    }
                  </View>

                  <TouchableOpacity style={styles.createButton} onPress={() => setMode('create')}>
                    <Ionicons name="add" size={22} color={colors.primary} />
                    <Text style={styles.createButtonText}>Create New Label</Text>
                  </TouchableOpacity>
                </>
              )
            }
        </View>
      </View>
    </Modal>
  )
}

export default LabelPickerModal