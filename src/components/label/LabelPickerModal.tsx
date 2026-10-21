import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { common } from '../../styles/common'
import { colors } from '../../styles/theme'
import { styles } from '../../styles/LabelPickerModal.styles'
import { inputStyles } from '../../styles/input.styles'
import { IconComponent } from '../AppIcon'
import { useHabits } from '../../context/HabitsContext'
import LabelForm from './LabelForm'
import { useLabel } from '../../context/LabelContext'
import LabelActionPopup from './LabelActionPopup'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LabelPickerModal = ({onClose, onDone, selectedLabels} : {
  onClose: ()=> void,
  onDone: (ids: string[]) => void,
  selectedLabels: string[]
}) => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<'pick' | 'create'>('pick')
  const [actionLabel, SetActionLabel] = useState('')
  const {getColor} = useHabits();
  const {searchLabels, setSelectedIds, toggleLabel, selectedIds, startEditing} = useLabel();
  const insets = useSafeAreaInsets()

  useEffect(() => {
    setSelectedIds(selectedLabels)
  }, [])
  
  const filteredLabels = searchLabels(search) 

  const setIsCreating = () => {
    setMode('pick');
  }

  const handleUpdate = (labelId: string) => {
    setMode('create')
    startEditing(labelId)
    SetActionLabel('')
  }
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[common.sheetOverlay, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
        <View style={[common.panel, common.sheet]}>
            <View style={common.sheetHandle} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
            {
              mode === 'create' ? (
                <LabelForm 
                  onCancel={setIsCreating}
                />
              ) : (
                <>
                  <View style={common.buttonRow}>
                    <TouchableOpacity onPress={onClose}>
                      <Ionicons name="arrow-back" size={22} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[common.label, common.headerTitle]}>Select Labels</Text>
                    <TouchableOpacity onPress={() => onDone(selectedIds)}>
                      <Text style={[common.label, common.textSuccess]}>Done ({selectedIds.length})</Text>
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

                  {/* <Text style={[common.heading, common.section]}>Recently Used</Text>
                  <View style={styles.chipGrid}>

                  </View> */}
                  <Text style={[common.heading, common.section]}>All Labels</Text>
                  <View style={styles.chipGrid}>
                    {
                      filteredLabels.map((label) => {
                        const isSelected = selectedIds.includes(label.id)
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
                            onLongPress={() => SetActionLabel(label.id)}
                          >
                            <IconComponent  icon={label.iconId} color={colorCode}/>
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
            </ScrollView>
        </View>

        {
          actionLabel !== '' && (
            <LabelActionPopup 
              closePopup={() => SetActionLabel('')}
              updateLabel={handleUpdate}
              labelId={actionLabel}
            />
          )
        }
      </View>
    </Modal>
  )
}

export default LabelPickerModal