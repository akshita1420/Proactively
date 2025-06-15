import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen')
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  }, []);

  const isSmallScreen = dimensions.window.height < 700;
  const isLandscape = dimensions.window.width > dimensions.window.height;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      
      if (userToken) {
        navigation.replace('Main');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password');
      return;
    }

    if (email === 'ethanharkinson@outlook.com' && password === 'password123') {
      try {
        await AsyncStorage.setItem('userToken', 'sample-auth-token');
        await AsyncStorage.setItem('userEmail', email);
        
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } catch (error) {
        console.error('Error storing credentials:', error);
        Alert.alert('Login Error', 'Failed to save login information');
      }
    } else {
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContainer,
            isLandscape && styles.landscapeContainer
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[
            styles.headerContainer,
            isSmallScreen && styles.headerContainerSmall,
            isLandscape && styles.headerContainerLandscape
          ]}>
            <Text style={[
              styles.headerText,
              isSmallScreen && styles.headerTextSmall
            ]}>Login to</Text>
            <View style={styles.brandContainer}>
              <Text style={[
                styles.brandText,
                isSmallScreen && styles.brandTextSmall
              ]}>proactively</Text>
              <Image 
                source={require('../../assets/images/entryvector.png')}
                style={[
                  styles.brandIcon,
                  isSmallScreen && styles.brandIconSmall
                ]}
              />
            </View>
            <Text style={[
              styles.subtitleText,
              isSmallScreen && styles.subtitleTextSmall
            ]}>Login as a patient using your registered email.</Text>
          </View>
          
          <View style={[
            styles.formContainer,
            isSmallScreen && styles.formContainerSmall,
            isLandscape && styles.formContainerLandscape
          ]}>
            <TextInput
              style={[
                styles.input,
                isEmailFocused && styles.inputFocused,
                isSmallScreen && styles.inputSmall
              ]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  isPasswordFocused && styles.inputFocused,
                  isSmallScreen && styles.inputSmall
                ]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons 
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} 
                  size={isSmallScreen ? 20 : 24} 
                  color="#999" 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.loginButton,
                isSmallScreen && styles.loginButtonSmall
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  landscapeContainer: {
    paddingHorizontal: '15%',
  },
  headerContainer: {
    paddingHorizontal: 30,
    marginBottom: 60,
    marginTop: -10,
    paddingTop: 40,
  },
  headerContainerSmall: {
    marginBottom: 35,
    paddingTop: 25,
  },
  headerContainerLandscape: {
    paddingTop: 20,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  headerTextSmall: {
    fontSize: 18,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
  brandText: {
    fontSize: 33,
    fontWeight: '600',
    color: '#4384E6',
  },
  brandTextSmall: {
    fontSize: 28,
  },
  brandIcon: {
    width: 23,
    height: 22,
    marginLeft: 5,
    marginTop: 15,
  },
  brandIconSmall: {
    width: 20,
    height: 19,
    marginTop: 12,
  },
  subtitleText: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: 'rgba(112, 112, 112, 1)',
    marginTop: 25,
    marginBottom: 10,
  },
  subtitleTextSmall: {
    fontSize: 13,
    marginTop: 20,
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: -40,
  },
  formContainerSmall: {
    marginTop: -20,
  },
  formContainerLandscape: {
    marginTop: 0,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  inputSmall: {
    height: 45,
    fontSize: 15,
    marginVertical: 8,
  },
  passwordContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  passwordInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    height: 24,
    width: 24,
  },
  inputFocused: {
    borderColor: '#4384E6',
  },
  loginButton: {
    backgroundColor: '#4384E6',
    height: 54,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonSmall: {
    height: 48,
    marginTop: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
  },
});