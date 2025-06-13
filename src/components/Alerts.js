import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

const Alerts = ({ visible, alerts, onClose }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.alertsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Alerts</Text>
          </View>
          
          {alerts.map((alert, index) => (
            <View key={index} style={styles.alertCard}>
              <Image
                source={alert.type === 'success' 
                  ? require('../assets/check2.png')
                  : require('../assets/warning.png')}
                style={styles.alertIcon}
                resizeMode="contain"
              />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
              {alert.type === 'success' && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={onClose}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={alert.onView}
                  >
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertsContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerContainer: {
    backgroundColor: '#E5E5E5',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignItems: 'center', // Center items
  },
  alertIcon: {
    width: 80, // Larger icon
    height: 80, // Larger icon
    marginBottom: 15, // Space between icon and text
  },
  alertContent: {
    alignItems: 'center', // Center text
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center buttons
    gap: 10, // Space between buttons
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#178ea3',
  },
  viewButton: {
    backgroundColor: '#178ea3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#178ea3',
  },
  viewButtonText: {
    color: '#FFFFFF',
  },
});

export default Alerts;