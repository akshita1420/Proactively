import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, Animated, Text, LogBox, TouchableOpacity, Platform, Image } from 'react-native';
import { StatusBar as RNStatusBar } from 'react-native'; // Add this import
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Add this import

// Ignore specific log notifications
LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

// Import our custom components
import Header from '../components/Header/Header';
import HealthScore from '../components/HealthScore/HealthScore';
import AnimatedBanner from '../components/AnimatedBanner/AnimatedBanner';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import AppointmentCard from '../components/AppointmentCard/AppointmentCard';
import HealthOverviewBoxes from '../components/HealthOverview/HealthOverviewBoxes';
import ToDosSection from '../components/ToDos/ToDosSection';

// Get dimensions
const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

// Helper functions for responsive sizes
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
  const navigation = useNavigation(); // Add this hook to access navigation
  
  // Health score state kept at the top level so it can be passed down to components
  const [healthScore, setHealthScore] = useState(1500);
  
  // Add state for orientation
  const [dimensions, setDimensions] = useState({ 
    window: Dimensions.get('window') 
  });
  
  // Create an animated scroll value
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Define fontSize for responsive text
  const fontSize = Math.min(Math.max(dimensions.window.width * 0.045, 16), 18);
  
  // Calculate animation values for the white box
  const whiteBoxTranslateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -100],
    extrapolate: 'clamp'
  });
  
  // Handle orientation changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ window });
    });
    
    return () => subscription?.remove();
  }, []);
  
  // Mock appointment data
  const appointment = {
    doctor: "Dr. Sarah Johnson",
    date: "June 15, 2023",
    time: "10:30 AM"
  };

  // Add these navigation handlers
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar style="light" />
      
      {/* Fixed header */}
      <View style={styles.headerContainer}>
        <Header screenWidth={dimensions.window.width} />
      </View>
      
      {/* Scrollable content with everything else */}
      <Animated.ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        bounces={false} // Prevent bouncing at the top and bottom
        overScrollMode="never" // Prevent overscrolling on Android
        contentContainerStyle={{ paddingBottom: 10 }} // Reduced from 67 to 10
      >
        {/* Health Banner */}
        <View style={styles.healthBanner}>
          {/* Health Score */}
          <HealthScore 
            score={healthScore} 
            screenWidth={dimensions.window.width}
            screenHeight={dimensions.window.height}
          />
          
          {/* Health Banner Image Container */}
          <AnimatedBanner 
            screenWidth={dimensions.window.width}
            screenHeight={dimensions.window.height}
          />
          
          {/* Progress Bar */}
          <ProgressBar 
            healthScore={healthScore} 
            setHealthScore={setHealthScore}
            screenWidth={dimensions.window.width}
          />
        </View>
        
        {/* White box content */}
        <Animated.View 
          style={[
            styles.whiteBox,
            { transform: [{ translateY: whiteBoxTranslateY }] }
          ]}
        >
          <View style={styles.contentContainer}>
            {/* Appointment Card */}
            <AppointmentCard 
              appointment={appointment}
              screenWidth={dimensions.window.width}
            />
            
            {/* Health Overview Section */}
            <HealthOverviewBoxes screenWidth={dimensions.window.width} />
            
            {/* To-Dos Section */}
            <ToDosSection screenWidth={dimensions.window.width} />
            
            {/* Add reasonable padding at the bottom for better scrolling experience */}
            <View style={{ height: 20 }} /> {/* Reduced from 60 to 20 */}
          </View>
        </Animated.View>
      </Animated.ScrollView>
      
      {/* Replace custom navbar with shared component */}
      
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
    paddingTop: getStatusBarHeight(), // Use dynamic status bar height instead of hp(5)
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
    marginTop: -hp(5), // Changed from -hp(5) to -hp(8) to move it up
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 0,
    minHeight: hp(80), // Add minimum height to prevent scrolling issues
  },
  contentContainer: {
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    paddingBottom: 40, // Increase padding to prevent scroll-beyond issues
    minHeight: '100%', // Ensure content fills available space
  },
  todosText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});