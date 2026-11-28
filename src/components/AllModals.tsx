import React from 'react'
import { Modal, ScrollView, Text, View } from 'react-native'
import { useApp } from '../context/appContext'
import { common } from '../styles/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EditHabitItemModal from './habit/EditHabitItemModal'
import ColorsModal from './modal/ColorsModal'
import IconsModal from './modal/IconsModal'
import EditLabelModal from './label/EditLabelModal'
import LabelPickerModal from './label/LabelPickerModal'

const AllModals = () => {
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
              { currentModal === 'EditHabitItemModal' && <EditHabitItemModal /> }

              { currentModal === 'colorsModal' && <ColorsModal /> }

              { currentModal === 'iconModal' && <IconsModal /> }

              { currentModal === 'EditLabelModal' && <EditLabelModal />}

              { currentModal === 'LabelPickerModal' && <LabelPickerModal />}
            </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default AllModals