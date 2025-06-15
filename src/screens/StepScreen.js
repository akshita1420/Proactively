import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Platform, 
  TextInput, 
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StepScreen = () => {
  const navigation = useNavigation();
  const [stepCount, setStepCount] = useState('');
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
  const contentTopMargin = screenHeight * 0.1;
  const isSmallDevice = screenWidth < 360;
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    if (stepCount) {
      try {
        await AsyncStorage.setItem('stepsData', stepCount);
        console.log('Step count submitted:', stepCount);
        
        navigation.goBack();
      } catch (error) {
        console.error('Error saving steps data:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleGoBack}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Steps Entry</Text>
          </View>
          
          <View style={{ width: 40 }} />
        </View>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[
            styles.contentContainer, 
            { 
              marginTop: contentTopMargin,
            }
          ]}>
            <View style={styles.inputSection}>
              <Text style={[
                styles.inputLabel,
                { 
                  fontSize: screenWidth < 350 ? 18 : 20,
                  marginBottom: screenHeight * 0.01
                }
              ]}>
                Steps Count:
              </Text>
              
              <View style={[
                styles.inputBox, 
                { 
                  width: inputWidth,
                  height: screenHeight < 600 ? 60 : 76,
                  marginBottom: screenHeight * 0.025
                }
              ]}>
                <TextInput
                  style={[
                    styles.textInput,
                    { fontSize: screenWidth < 350 ? 16 : 18 }
                  ]}
                  keyboardType="numeric"
                  value={stepCount}
                  onChangeText={setStepCount}
                  placeholder=""
                />
                {stepCount ? (
                  <View style={styles.stepTextContainer}>
                    <Text style={[
                      styles.boldStepCount,
                      { fontSize: screenWidth < 350 ? 16 : 18 }
                    ]}>
                      {stepCount}
                    </Text>
                    <Text style={[
                      styles.stepsText,
                      { fontSize: screenWidth < 350 ? 16 : 18 }
                    ]}>
                      {" steps"}
                    </Text>
                  </View>
                ) : null}
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    height: 50,
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
  keyboardAvoidContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
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
    borderColor: 'rgba(227, 227, 227, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textInput: {
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    color: 'transparent',
  },
  stepTextContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 15,
  },
  boldStepCount: {
    fontWeight: 'bold',
    color: '#000',
  },
  stepsText: {
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
  }
});

export default StepScreen;