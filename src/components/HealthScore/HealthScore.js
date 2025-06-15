import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthScore = ({ score, screenWidth = 375, screenHeight = 812 }) => {




  const containerWidth = screenWidth * 0.75; 
  const fontSize = {
    title: Math.min(Math.max(screenWidth * 0.04, 14), 18),
    score: Math.min(Math.max(screenWidth * 0.1, 36), 48),
    disclaimer: Math.min(Math.max(screenWidth * 0.035, 12), 16)
  };
 
  


  return (
    <View style={[styles.healthScoreContainer, { width: containerWidth }]}>
      <Text style={[styles.healthScoreText, { fontSize: fontSize.title }]}>
        Health Score
      </Text>
      
      <Text style={[styles.currentScoreValue, { fontSize: fontSize.score }]}>
        {score.toLocaleString()}
      </Text>
      
      <Text style={[styles.disclaimerText, { fontSize: fontSize.disclaimer }]}>
        This score is for information purposes only.
      </Text>
    </View>
  );
};




const styles = StyleSheet.create({
  healthScoreContainer: {
    height: 130,
    marginTop: 10, 
    marginBottom: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '5%',
  },
  healthScoreText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    color: 'rgba(213, 216, 255, 1)',
    textAlign: 'left',
  },
  currentScoreValue: {
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.4,
    color: 'white',
    textAlign: 'left',
    marginTop: 45, 
  },
  disclaimerText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
    color: 'rgba(213, 216, 255, 1)',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 3,
  },
});

export default HealthScore;