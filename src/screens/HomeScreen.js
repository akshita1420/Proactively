import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Animated, Text, LogBox, TouchableOpacity, Platform, Image } from 'react-native';
import { StatusBar as RNStatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

import Header from '../components/Header/Header';
import HealthScore from '../components/HealthScore/HealthScore';
import AnimatedBanner from '../components/AnimatedBanner/AnimatedBanner';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import AppointmentCard from '../components/AppointmentCard/AppointmentCard';
import HealthOverviewBoxes from '../components/HealthOverview/HealthOverviewBoxes';
import ToDosSection from '../components/ToDos/ToDosSection';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const wp = (percentage) => {
  return windowWidth * (percentage / 100);
};

const hp = (percentage) => {
  return windowHeight * (percentage / 100);
};

const getStatusBarHeight = () => {
  return Platform.OS === 'ios' ? 44 : RNStatusBar.currentHeight || 24;
};

export default function HomeScreen() {
  const navigation = useNavigation();
  
  const [healthScore, setHealthScore] = useState(1500);
  
  const [dimensions, setDimensions] = useState({ 
    window: Dimensions.get('window') 
  });
  
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const fontSize = Math.min(Math.max(dimensions.window.width * 0.045, 16), 18);
  
  const whiteBoxTranslateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    
    return () => subscription?.remove();
  }, []);
  
  const appointment = {
    doctor: "Dr. Sarah Johnson",
    date: "June 15, 2023",
    time: "10:30 AM"
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar style="light" />
      
      <View style={styles.headerContainer}>
        <Header screenWidth={dimensions.window.width} />
      </View>
      
      <Animated.ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={styles.healthBanner}>
          <HealthScore 
            score={healthScore} 
            screenWidth={dimensions.window.width}
            screenHeight={dimensions.window.height}
          />
          
          <AnimatedBanner 
            screenWidth={dimensions.window.width}
            screenHeight={dimensions.window.height}
          />
          
          <ProgressBar 
            healthScore={healthScore} 
            setHealthScore={setHealthScore}
            screenWidth={dimensions.window.width}
          />
        </View>
        
        <Animated.View 
          style={[
            styles.whiteBox,
            { transform: [{ translateY: whiteBoxTranslateY }] }
          ]}
        >
          <View style={styles.contentContainer}>
            <AppointmentCard 
              appointment={appointment}
              screenWidth={dimensions.window.width}
            />
            
            <HealthOverviewBoxes screenWidth={dimensions.window.width} />
            
            <ToDosSection screenWidth={dimensions.window.width} />
            
            <View style={{ height: 20 }} />
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D53B6',
  },
  headerContainer: {
    height: hp(8),
    paddingHorizontal: wp(5),
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#3D53B6',
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  healthBanner: {
    width: '100%',
    backgroundColor: '#3D53B6',
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
    paddingTop: hp(2),
    flexDirection: 'column',
  },
  whiteBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -hp(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 0,
    minHeight: hp(80),
  },
  contentContainer: {
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    paddingBottom: 40,
    minHeight: '100%',
  },
  todosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});