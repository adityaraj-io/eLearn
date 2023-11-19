import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native';

const ProgressBarModal = ({ visible }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
      </View>
      <StatusBar backgroundColor={'#fff'} style={'dark'} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProgressBarModal;
