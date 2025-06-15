import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ screenWidth = 377 }) => {
  const profileSize = screenWidth * 0.1;
  const fontSize = Math.min(Math.max(screenWidth * 0.045, 16), 20);
  
  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileContainer}>
        <Image 
          source={require('../../../assets/images/profile.png')}
          style={[styles.profileImage, { width: profileSize, height: profileSize }]}
        />
      </View>
      <Text style={[styles.userName, { fontSize: fontSize }]}>Ethan Harkinson</Text>
      <Ionicons 
        name="notifications-outline" 
        size={Math.min(Math.max(screenWidth * 0.05, 18), 24)} 
        color="white" 
        style={styles.bellIcon} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 55,
    marginBottom: 10,
    paddingBottom: 0,
    marginTop: -15,
  },
  profileContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  profileImage: {
    borderRadius: 5,
  },
  userName: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.18,
    color: 'white',
    position: 'absolute',
    left: '35%',
    top: 5,
  },
  bellIcon: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
});

export default Header;