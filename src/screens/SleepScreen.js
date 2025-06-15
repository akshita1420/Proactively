import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SleepScreen = () => {
  const navigation = useNavigation();
  const [sleepHours, setSleepHours] = useState(8);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  
  useEffect(() => {
    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };
    
    Dimensions.addEventListener('change', updateLayout);
    
    return () => {
      if (Dimensions.removeEventListener) {
        Dimensions.removeEventListener('change', updateLayout);
      }
    };
  }, []);
  
  const inputWidth = Math.min(screenWidth * 0.9, 335);
  const headerSpacing = screenHeight * 0.04;
  const contentTopMargin = -Math.min(screenHeight * 0.6, 500);
  const isSmallDevice = screenWidth < 360;
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (sleepHours) {
      try {
        await AsyncStorage.setItem('sleepData', JSON.stringify({
          hours: sleepHours,
          date: new Date().toISOString()
        }));
        
        console.log('Sleep hours stored:', sleepHours);
        navigation.goBack();
      } catch (error) {
        console.error('Error saving sleep data:', error);
      }
    }
  };
  
  const decrementHours = () => {
    if (sleepHours > 1) {
      setSleepHours(sleepHours - 1);
    }
  };
  
  const incrementHours = () => {
    if (sleepHours < 24) {
      setSleepHours(sleepHours + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={{ height: headerSpacing }} />
      
      <View style={[styles.headerContainer, { marginTop: -4}]}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleGoBack}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Sleep Entry</Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </View>
      
      <View style={[
        styles.contentContainer, 
        { 
          marginTop: contentTopMargin,
          paddingBottom: screenHeight * 0.06
        }
      ]}>
        <View style={styles.inputSection}>
          <View style={[
            styles.inputBox, 
            { 
              width: inputWidth,
              height: screenHeight < 600 ? 60 : 76,
              marginBottom: screenHeight * 0.025,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderColor: 'rgba(227, 227, 227, 1)',
            }
          ]}>
            <TouchableOpacity 
              style={[styles.circleButton, {
                backgroundColor: 'rgba(233, 240, 255, 1)',
                borderColor: 'rgba(79, 101, 203, 1)',
                borderWidth: 1,
                width: 35,
                height: 35,
              }]}
              onPress={decrementHours}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={20} color="rgba(79, 101, 203, 1)" />
            </TouchableOpacity>
            
            <View style={styles.hourDisplayContainer}>
              <Image 
                source={require('../../assets/images/sleep_icon.png')} 
                style={styles.sleepIcon} 
              />
              <Text style={styles.hourValue}>{sleepHours}</Text>
              <Text style={styles.hourUnit}> hours</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.circleButton, {
                backgroundColor: 'rgba(233, 240, 255, 1)',
                borderColor: 'rgba(79, 101, 203, 1)',
                borderWidth: 1,
                width: 35,
                height: 35,
              }]}
              onPress={incrementHours}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color="rgba(79, 101, 203, 1)" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[
              styles.submitButton,
              { 
                width: inputWidth,
                height: screenHeight < 600 ? 45 : 50
              }
            ]}
            onPress={handleSubmit}
          >
            <Text style={[
              styles.submitButtonText,
              { fontSize: screenWidth < 350 ? 14 : 16 }
            ]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    width: '100%',
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontWeight: '500',
    color: '#333',
    textAlign: 'left',
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    position: 'relative',
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hourValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  hourUnit: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'rgba(153, 153, 153, 1)',
  },
  submitButton: {
    backgroundColor: 'rgba(67, 132, 230, 1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitButtonText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  sleepIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  }
});

export default SleepScreen;