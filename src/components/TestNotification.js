// Create this file and directory if they don't exist

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import NotificationService from '../services/NotificationService';
import Constants from 'expo-constants';

const TestNotification = () => {
  const [loading, setLoading] = useState(false);
  const [isExpoGo, setIsExpoGo] = useState(false);
  
  useEffect(() => {
    setIsExpoGo(Constants.appOwnership === 'expo');
  }, []);

  // Get FCM token for testing
  const getToken = async () => {
    setLoading(true);
    try {
      const token = await NotificationService.getStoredFCMToken();
      setLoading(false);
      
      if (token) {
        Alert.alert(
          "FCM Token",
          "Copy this token to use in Postman:\n\n" + token + 
          (isExpoGo ? "\n\n(This is a mock token for Expo Go)" : ""),
          [{ text: "OK" }]
        );
      } else {
        Alert.alert("Error", "No FCM token found. Please restart the app.");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to get FCM token.");
    }
  };

  // Send a test local notification
  const sendLocalNotification = async () => {
    try {
      await NotificationService.scheduleLocalNotification(
        "Test Appointment Reminder", 
        "You have an appointment with Dr. Johnson tomorrow at 10:00 AM",
        {
          appointmentId: "local-test-123",
          doctor: "Dr. Johnson",
          specialty: "Cardiology",
          date: "Tomorrow",
          time: "10:00 AM"
        }
      );
      Alert.alert("Success", "Local notification sent. Check your notification tray.");
    } catch (error) {
      Alert.alert("Error", "Failed to send local notification: " + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Push Notification Testing</Text>
        
        {isExpoGo ? (
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              ⚠️ You are running in Expo Go
            </Text>
            <Text style={styles.description}>
              Push notifications from Firebase require a development build.
              You can still test with local notifications here.
            </Text>
          </View>
        ) : null}
        
        <TouchableOpacity 
          style={[styles.button, isExpoGo ? {backgroundColor: '#FFA500'} : null]}
          onPress={sendLocalNotification}
        >
          <Text style={styles.buttonText}>Send Test Local Notification</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={getToken}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>
              {isExpoGo ? "Get Mock FCM Token" : "Get FCM Token"}
            </Text>
          )}
        </TouchableOpacity>
        
        {isExpoGo ? (
          <Text style={styles.instructions}>
            For full push notification functionality:{'\n'}
            1. Create a development build using 'eas build'{'\n'}
            2. Install the build on your device{'\n'}
            3. Then you can use real FCM tokens with Postman
          </Text>
        ) : (
          <Text style={styles.instructions}>
            1. Copy the token that appears{'\n'}
            2. Use it in Postman to send a test notification{'\n'}
            3. Click the notification to navigate to appointment details
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4384E6',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  warningContainer: {
    backgroundColor: '#FFF8E1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  warningText: {
    color: '#FF8C00',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4384E6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  instructions: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  }
});

export default TestNotification;