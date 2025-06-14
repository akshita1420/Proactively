import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthOverviewBoxes = ({ screenWidth = 375 }) => {
  const [stepsData, setStepsData] = useState(null);
  const [bmiData, setBmiData] = useState(null);
  const [sleepData, setSleepData] = useState(null);
  const navigation = useNavigation();
  
  // Calculate responsive sizes
  const fontSize = Math.min(Math.max(screenWidth * 0.045, 16), 18);
  const boxWidth = 155; // Fixed width instead of responsive calculation
  
  // Fetch health data from AsyncStorage on component mount
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        // Get steps data
        const steps = await AsyncStorage.getItem('stepsData');
        if (steps) setStepsData(steps);
        
        // Get BMI data
        const bmi = await AsyncStorage.getItem('bmiData');
        if (bmi) setBmiData(JSON.parse(bmi));
        
        // Get sleep data
        const sleep = await AsyncStorage.getItem('sleepData');
        if (sleep) setSleepData(JSON.parse(sleep));
        
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };
    
    fetchHealthData();
    
    // Refetch when screen is focused
    const unsubscribe = navigation.addListener('focus', fetchHealthData);
    return unsubscribe;
  }, [navigation]);
  
  // Navigation handlers
  const handleStepsPress = () => navigation.navigate('StepScreen');

  const handleBMIPress = () => {
    navigation.navigate('bmiScreen');
  };

  const handleSleepPress = () => {
    navigation.navigate('sleepScreen');
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.healthOverviewText, { fontSize }]}>
        Health Overview
      </Text>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.boxesContainer}
        style={{ width: '100%' }}
      >
        {/* Box 1 - Light blue - Steps */}
        <TouchableOpacity 
          style={[
            styles.colorBox, 
            { 
              backgroundColor: 'rgba(233, 240, 255, 1)',
              width: boxWidth
            }
          ]} 
          onPress={handleStepsPress}
          activeOpacity={0.7}
        >
          <Text style={styles.boxTitle}>Steps</Text>
          
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color="rgba(160, 184, 230, 1)"
            style={styles.arrowIcon}
          />
          
          {/* Content for box 1 - Steps */}
          {stepsData ? (
            <>
              <Text style={[styles.updatedText, { color: 'rgba(79, 101, 203, 1)' }]}>
                Updated
              </Text>
              <Text style={[styles.dashText, { 
                color: 'rgba(79, 101, 203, 1)',
                position: 'absolute',
                bottom: 20,
                left: 12
              }]}>
                {parseInt(stepsData).toLocaleString()}
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.noDataText, { color: 'rgba(79, 101, 203, 1)' }]}>
                No Data
              </Text>
              <Text style={[styles.dashText, { 
                color: 'rgba(79, 101, 203, 1)',
                position: 'absolute',
                bottom: 20,
                left: 12
              }]}>
                -
              </Text>
            </>
          )}
        </TouchableOpacity>
        
        {/* Box 2 - Light yellow - BMI */}
        <TouchableOpacity 
          style={[
            styles.colorBox, 
            { 
              backgroundColor: 'rgba(251, 255, 200, 1)',
              width: boxWidth
            }
          ]}
          onPress={handleBMIPress}
          activeOpacity={0.7}
        >
          <Text style={styles.boxTitle}>BMI</Text>
          
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color="rgba(205, 212, 122, 1)"
            style={styles.arrowIcon}
          />
          
          {/* Content for box 2 - BMI with kg/m² */}
          {bmiData ? (
            <>
              <Text style={[styles.updatedText, { color: 'rgba(123, 132, 0, 1)' }]}>
                Updated
              </Text>
              <View style={styles.valueContainer}>
                <Text style={[styles.dashText, { color: 'rgba(123, 132, 0, 1)' }]}>
                  {bmiData.bmi}
                </Text>
                <Text style={[styles.unitText, { 
                  color: 'rgba(102, 102, 102, 0.4)',
                  fontFamily: 'Inter', 
                  fontWeight: '500',
                  fontSize: 14,
                  lineHeight: 14,
                }]}>
                  kg/m²
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.noDataText, { color: 'rgba(123, 132, 0, 1)' }]}>
                No Data
              </Text>
              <Text style={[styles.dashText, { 
                color: 'rgba(123, 132, 0, 1)',
                position: 'absolute',
                bottom: 20,
                left: 12
              }]}>
                -
              </Text>
            </>
          )}
        </TouchableOpacity>
        
        {/* Box 3 - Light orange - Sleep */}
        <TouchableOpacity 
          style={[
            styles.colorBox, 
            { 
              backgroundColor: 'rgba(255, 236, 200, 1)',
              width: boxWidth
            }
          ]}
          onPress={handleSleepPress}
          activeOpacity={0.7}
        >
          <Text style={styles.boxTitle}>Sleep</Text>
          
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color="rgba(211, 180, 123, 1)"
            style={styles.arrowIcon}
          />
          
          {/* Content for box 3 - Sleep with hours */}
          {sleepData ? (
            <>
              <Text style={[styles.updatedText, { color: 'rgba(178, 117, 0, 1)' }]}>
                Updated
              </Text>
              <View style={styles.valueContainer}>
                <Text style={[styles.dashText, { color: 'rgba(178, 117, 0, 1)' }]}>
                  {sleepData.hours}
                </Text>
                <Text style={[styles.unitText, { 
                  color: 'rgba(102, 102, 102, 0.4)',
                  fontFamily: 'Inter',
                  fontWeight: '500',
                  fontSize: 16,
                  lineHeight: 16,
                }]}>
                  hours
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.noDataText, { color: 'rgba(178, 117, 0, 1)' }]}>
                No Data
              </Text>
              <Text style={[styles.dashText, { 
                color: 'rgba(178, 117, 0, 1)',
                position: 'absolute',
                bottom: 20,
                left: 12
              }]}>
                -
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
      
      <View style={[styles.separator, { width: screenWidth * 0.9 }]} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  healthOverviewText: {
    fontFamily: 'Inter',
    fontWeight: '900',
    letterSpacing: -0.2,
    color: 'rgba(51, 51, 51, 1)',
    marginVertical: 15,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  boxesContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  colorBox: {
    width: 155, // Fixed width
    height: 129, // Fixed height
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    position: 'relative',
  },
  boxTitle: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 8,
  },
  arrowIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(236, 236, 236, 1)',
    marginTop: 20,
    marginBottom: 10,
  },
  noDataText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    marginTop: 4,
  },
  updatedText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    marginTop: 4,
  },
  dashText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 24,
    letterSpacing: 0,
    color: '#000',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    position: 'absolute',
    bottom: 20,
    left: 12,
  },
  unitText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    color: 'rgba(102, 102, 102, 0.4)',
    marginLeft: 4,
  }
});

export default HealthOverviewBoxes;