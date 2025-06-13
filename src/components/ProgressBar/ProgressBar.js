import React, { useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const windowWidth = Dimensions.get('window').width;

// Define gradient colors that will be used for both the progress bar and pointer
const gradientColors = ['#FF8090', '#FFDA68', '#75DE8D'];
const gradientLocations = [0.0224, 0.5137, 0.9582];

const ProgressBar = ({ healthScore, setHealthScore, screenWidth = 375 }) => {
  // Calculate responsive sizes
  const progressBarWidth = Math.min(screenWidth * 0.85, 335);
  const pointerPosition = (healthScore / 3000) * progressBarWidth;
  const triangleColor = getTriangleColor(pointerPosition / progressBarWidth);
  const fontSize = Math.min(Math.max(screenWidth * 0.03, 10), 12);
  
  // Create pan responder for draggable pointer
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Calculate new position based on drag
        const progressBarStart = screenWidth * 0.05; // 5% of screen
        
        // Calculate position relative to progress bar
        let newPosition = gestureState.moveX - progressBarStart;
        
        // Constrain position to progress bar bounds
        newPosition = Math.max(0, Math.min(progressBarWidth, newPosition));
        
        // Calculate and set new health score based on position
        const newScore = Math.round((newPosition / progressBarWidth) * 3000);
        setHealthScore(newScore);
      },
    })
  ).current;

  return (
    <View style={styles.progressBarContainer}>
      {/* Triangle pointer - now with dynamic color */}
      <View 
        {...panResponder.panHandlers}
        style={[
          styles.trianglePointer, 
          { 
            left: pointerPosition,
            borderTopColor: triangleColor
          }
        ]} 
      />
      
      <LinearGradient
        colors={gradientColors}
        locations={gradientLocations}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressBar, { width: progressBarWidth }]}
      />
      
      {/* Markings below the progress bar */}
      <View style={[styles.markingsContainer, { width: progressBarWidth }]}>
        <Text style={[styles.marking, { fontSize }]}>0</Text>
        <Text style={[styles.marking, { fontSize }]}>600</Text>
        <Text style={[styles.marking, { fontSize }]}>1200</Text>
        <Text style={[styles.marking, { fontSize }]}>1800</Text>
        <Text style={[styles.marking, { fontSize }]}>2400</Text>
        <Text style={[styles.marking, { fontSize }]}>3000</Text>
      </View>
    </View>
  );
};

// Helper functions for triangle color
function getTriangleColor(normalizedPosition) {
  if (normalizedPosition <= gradientLocations[0]) {
    return gradientColors[0];
  } else if (normalizedPosition <= gradientLocations[1]) {
    const ratio = (normalizedPosition - gradientLocations[0]) / 
                  (gradientLocations[1] - gradientLocations[0]);
    return interpolateColor(gradientColors[0], gradientColors[1], ratio);
  } else {
    const ratio = (normalizedPosition - gradientLocations[1]) / 
                  (gradientLocations[2] - gradientLocations[1]);
    return interpolateColor(gradientColors[1], gradientColors[2], ratio);
  }
}

function interpolateColor(color1, color2, ratio) {
  // Convert hex to RGB
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  
  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  
  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

const styles = StyleSheet.create({
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -5, // Changed from 5 to -5 to move it up further
    marginBottom: 35,
    position: 'relative',
  },
  trianglePointer: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 0,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    top: -14,
    zIndex: 10,
    marginLeft: -11,
  },
  progressBar: {
    height: 15,
    borderRadius: 51,
  },
  markingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  marking: {
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: -0.12,
    color: 'rgba(194, 211, 255, 1)',
    width: 31,
    textAlign: 'center',
  },
});

export default ProgressBar;