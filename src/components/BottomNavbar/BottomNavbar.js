import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Check which screen is active
  const isHomeActive = route.name === 'Home';
  const isProfileActive = route.name === 'Profile';

  return (
    <View style={styles.navbar}>
      <View style={styles.navbarContent}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Image 
            source={isHomeActive 
              ? require('../../../assets/images/active_home.png')
              : require('../../../assets/images/inactive_home.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={[
            styles.navText, 
            {color: isHomeActive ? 'rgba(97, 86, 178, 1)' : 'rgba(112, 112, 112, 1)'}
          ]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image 
            source={isProfileActive 
              ? require('../../../assets/images/active_acc.png')
              : require('../../../assets/images/inactive_acc.png')}
            style={styles.navIcon}
            resizeMode="contain"
          />
          <Text style={[
            styles.navText, 
            {color: isProfileActive ? 'rgba(97, 86, 178, 1)' : 'rgba(112, 112, 112, 1)'}
          ]}>Profile</Text>
        </TouchableOpacity>
      </View>
      
      {/* Add safe area padding for notch devices */}
      <View style={{ height: Platform.OS === 'ios' ? 20 : 0 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: 'rgba(236, 236, 236, 1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 100,
  },
  navbarContent: {
    flexDirection: 'row',
    height: 80, // Match the navbar height
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30, // Reduced from 40
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 10, // Reduced from 12
  },
  navIcon: {
    width: 22, // Reduced from 24
    height: 22, // Reduced from 24
    marginBottom: 5, // Reduced from 6
  },
  navText: {
    fontSize: 13, // Reduced from 14
    marginTop: 3, // Reduced from 4
    fontFamily: 'Inter',
    fontWeight: '500',
  }
});

export default BottomNavbar;