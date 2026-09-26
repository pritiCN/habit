import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { common } from '../styles/common'
import { colors } from '../styles/theme'
import { styles } from '../styles/LabelPickerModal.styles'

const LabelPickerModal = ({onClose} : {onClose: ()=> void}) => {
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
                <TouchableOpacity>
                  <Text style={[common.label, { color: colors.success }]}>Done (0)</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
    </Modal>
  )
}

export default LabelPickerModal