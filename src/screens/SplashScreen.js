import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const CustomSplashScreen = ({ onFinish }) => {
  // Get screen dimensions
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  // Create animated values for our elements
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  // Update dimensions when orientation changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    // This function will ensure proper timing
    const hideSplash = async () => {
      try {
        console.log("Custom splash screen mounted");
        
        // First hide the native splash screen so our custom one becomes visible
        await SplashScreen.hideAsync();
        
        // Start the logo animation
        Animated.sequence([
          // First, fade in and scale up the logo
          Animated.parallel([
            Animated.timing(logoOpacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.spring(logoScale, {
              toValue: 1,
              friction: 8,
              tension: 40,
              useNativeDriver: true,
            }),
          ]),
          
          // Then, fade in the text after a slight delay
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 600,
            delay: 200,
            useNativeDriver: true,
          }),
        ]).start();
        
        // Then wait before transitioning to the main app
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Fade out everything before moving on
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start(() => {
          console.log("Custom splash screen finishing");
          if (onFinish) onFinish();
        });
        
      } catch (e) {
        console.warn("Error in splash screen:", e);
        if (onFinish) onFinish();
      }
    };

    hideSplash();
  }, [logoOpacity, logoScale, textOpacity, onFinish]);

  // Calculate responsive sizes
  const logoSize = Math.min(dimensions.window.width, dimensions.window.height) * 0.2;
  const fontSize = dimensions.window.width * 0.045;
  // Reduce the bottomPadding to move text up
  const bottomPadding = dimensions.window.height * 0.08; // Changed from 0.05 to 0.08

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00AB9A', '#204CBB']} 
        start={{ x: 0.8, y: 0.2 }}
        end={{ x: 0.2, y: 0.8 }} 
        locations={[0.0, 0.8038]}
        angle={152}
        style={styles.background}
      >
        {/* Center container for better vertical positioning */}
        <View style={styles.centerContainer}>
          {/* Animated logo with responsive sizing */}
          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }}
          >
            <Image
              source={require('../../assets/images/splashIcon.png')}
              style={[
                styles.logo,
                {
                  width: logoSize,
                  height: logoSize * (90/94), // Maintain aspect ratio
                }
              ]}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
        
        {/* Animated "Powered by Proactively" text with responsive sizing */}
        <Animated.Text
          style={[
            styles.poweredByText,
            { 
              opacity: textOpacity,
              fontSize: fontSize,
              lineHeight: fontSize,
              letterSpacing: -fontSize * 0.02,
              bottom: bottomPadding,
              marginTop: 20, // Added margin to help push text up
            }
          ]}
        >
          Powered by Proactively
        </Animated.Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // Base style - dimensions will be overridden with calculated values
  },
  poweredByText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    color: 'white',
    position: 'absolute',
    textAlign: 'center',
    // Font size, line height, letter spacing, and bottom position 
    // will be set dynamically based on screen size
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomSplashScreen;