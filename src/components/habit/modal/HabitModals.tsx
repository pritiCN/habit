import React from 'react'
import { Modal, ScrollView, Text, View } from 'react-native'
import { useApp } from '../../../context/appContext'
import { common } from '../../../styles/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EditHabitItemModal from './EditHabitItemModal'
import ColorsModal from './ColorsModal'

const HabitModals = () => {
  const insets = useSafeAreaInsets()
  const {closeModal, modalState} = useApp()
  const close = () => {
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

              {
                currentModal === 'EditHabitItemModal' && (
                  <EditHabitItemModal />
                )
              }

              {
                currentModal === 'colorsModal' && (
                  <ColorsModal />
                )
              }
            </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default HabitModals