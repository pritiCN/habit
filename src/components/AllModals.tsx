import React from 'react'
import { Modal, ScrollView, Text, View } from 'react-native'
import { useApp } from '../context/appContext'
import { common } from '../styles/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EditHabitItemModal from './habit/modal/EditHabitItemModal'
import ColorsModal from './habit/modal/ColorsModal'
import IconsModal from './habit/modal/IconsModal'
import { useHabits } from '../context/HabitsContext'
import EditLabelModal from './label/modal/EditLabelModal'

const AllModals = () => {
  const insets = useSafeAreaInsets()
  const {setCurrentHabit} = useHabits()
  const {closeModal, modalState} = useApp()
  const close = () => {
    setCurrentHabit(undefined)
    closeModal()
  }

  const {currentModal} = modalState
  return (
    <Modal
        visible={currentModal !== ''}
        animationType="slide"
        transparent={true}
        onRequestClose={close}
    >
      <View style={[common.sheetOverlay, { paddingBottom: insets.bottom, paddingTop: insets.top }]}>
        <View style={[common.panel, common.sheet]}>
          <View style={common.sheetHandle} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
              { currentModal === 'EditHabitItemModal' && <EditHabitItemModal /> }

              { currentModal === 'colorsModal' && <ColorsModal /> }

              { currentModal === 'iconModal' && <IconsModal /> }

              { currentModal === 'EditLabelModal' && <EditLabelModal />}
            </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default AllModals