import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  // Enhanced function to handle logout with credential clearing
  const handleLogout = async () => {
    try {
      // Show confirmation dialog
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Log Out",
            onPress: async () => {
              try {
                // Clear all stored user credentials
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userEmail');
                await AsyncStorage.removeItem('userId');
                await AsyncStorage.removeItem('rememberMe');
                
                console.log('Successfully cleared user credentials');
                
                // Navigate to Login screen
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } catch (error) {
                console.error('Error during logout:', error);
                Alert.alert(
                  "Logout Error",
                  "There was a problem logging out. Please try again."
                );
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error during logout confirmation:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Spacer to push content down */}
      <View style={styles.topSpacer} />
      
      {/* Profile Header - Moved lower and made bigger */}
      <View style={styles.profileHeader}>
        {/* Profile Photo - Larger size */}
        <Image 
          source={require('../../assets/images/profile.png')}
          style={styles.profilePhoto}
        />
        
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Ethan Harkinson</Text>
          <Text style={styles.userEmail}>ethanharkinson@outlook.com</Text>
        </View>
      </View>
      
      {/* Account Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Image 
            source={require('../../assets/images/stat_profile.png')}
            style={styles.accountIcon}
          />
          <Text style={styles.sectionTitle}>Account</Text>
        </View>
        
        {/* Separator Line */}
        <View style={styles.separator} />
      </View>
      
      {/* Log Out Button - Added onPress handler */}
      <TouchableOpacity 
        style={styles.logoutContainer}
        onPress={handleLogout}
        activeOpacity={0.6} // Add visual feedback on press
      >
        <View style={styles.logoutButtonContent}>
          {/* Removed the Ionicons logout icon */}
          <Text style={styles.logoutText}>Log out</Text>
        </View>
        <Ionicons name="chevron-forward" size={19} color="rgba(253, 116, 104, 1)" />
      </TouchableOpacity>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Empty space */}
      </View>
      
      {/* Version Text */}
      <Text style={styles.versionText}>Proactively version 0.0.1</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSpacer: {
    height: 40,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 20,
  },
  profilePhoto: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  userInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  userName: {
    fontFamily: 'Inter',
    fontWeight: '700', // Changed to bold
    fontSize: 22,
    lineHeight: 22,
    letterSpacing: -0.22,
    color: 'rgba(0, 0, 0, 1)',
    marginBottom: 6,
  },
  userEmail: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 15,
    color: 'rgba(112, 112, 112, 1)',
  },
  sectionContainer: {
    paddingHorizontal: 22,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 19,
    fontWeight: '700', // Changed to bold
    color: 'rgba(0, 0, 0, 1)',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(220, 220, 224, 1)',
    marginTop: 15,
    width: '100%',
  },
  accountIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginTop: 20, // Changed from 30 to 20 to move it higher
    height: 48, // Fixed height for better touch target
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Inter',
    fontSize: 19,
    fontWeight: '500',
    color: 'rgba(253, 116, 104, 1)',
    // Removed marginLeft since there's no icon anymore
  },
  content: {
    flex: 1,
  },
  versionText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 12,
    letterSpacing: 0,
    color: 'rgba(112, 112, 112, 1)',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default ProfileScreen;