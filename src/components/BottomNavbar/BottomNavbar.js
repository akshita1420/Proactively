import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
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
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 30,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  navIcon: {
    width: 22,
    height: 22,
    marginBottom: 5,
  },
  navText: {
    fontSize: 13,
    marginTop: 3,
    fontFamily: 'Inter',
    fontWeight: '500',
  }
});

export default BottomNavbar;