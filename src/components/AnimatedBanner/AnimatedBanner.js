import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const AnimatedBanner = ({ screenWidth = 375, screenHeight = 812 }) => {
  const moveAnim = useRef(new Animated.Value(-screenWidth * 0.7)).current;

  useEffect(() => {
    const startAnimation = () => {
      moveAnim.setValue(-screenWidth * 0.7);
      
      Animated.timing(moveAnim, {
        toValue: screenWidth,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true
      }).start(() => {
        startAnimation();
      });
    };

    startAnimation();
    
    return () => {
      moveAnim.stopAnimation();
    };
  }, [moveAnim, screenWidth]);

  return (
    <View style={styles.bannerImageContainer}>
      <Animated.Image 
        source={require('../../../assets/images/healthBanner.png')}
        style={[
          styles.bannerImage,
          {
            width: screenWidth * 0.7,
            height: Math.min(screenHeight * 0.25, 200),
            transform: [{ translateX: moveAnim }]
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: -107,
    alignItems: 'center',
  },
  bannerImage: {
    marginTop: -20,
  },
});

export default AnimatedBanner;