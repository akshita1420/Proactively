import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform, 
  Image, 
  ScrollView,
  Dimensions,
  Linking // Import Linking API
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const AppointmentScreen = () => {
  // Get screen dimensions and handle orientation changes
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);
  
  const { width: screenWidth, height: screenHeight } = dimensions;
  const isSmallDevice = screenWidth < 375;
  const isLandscape = screenWidth > screenHeight;
  
  const navigation = useNavigation();
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  // Update the handler to open the meeting link
  const handleJoinMeeting = async () => {
    const meetingLink = "https://www.meet.google.com/abc-defa-dwa";
    
    try {
      // Check if the URL can be opened
      const canOpen = await Linking.canOpenURL(meetingLink);
      
      if (canOpen) {
        // Open the URL in the browser or appropriate app
        await Linking.openURL(meetingLink);
      } else {
        console.log("Cannot open URL: " + meetingLink);
        // You could show an alert here to inform the user
      }
    } catch (error) {
      console.error("An error occurred while opening the meeting link:", error);
      // Handle errors appropriately
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <View style={styles.container}>
        {/* Header with responsive padding */}
        <View style={[
          styles.headerContainer, 
          { paddingTop: isLandscape ? 10 : Platform.OS === 'ios' ? 40 : 20 }
        ]}>
          <View style={styles.header}>
            <View style={styles.leftSection}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleGoBack}
              >
                <Ionicons name="arrow-back" size={isSmallDevice ? 20 : 24} color="#333" />
              </TouchableOpacity>
              
              <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 17 : 19 }]}>
                Appointment Details
              </Text>
            </View>
            
            <View style={{ width: isSmallDevice ? 80 : 100 }} />
          </View>
        </View>
        
        {/* Main content in ScrollView */}
        <View style={styles.mainContentWrapper}>
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={[
              styles.content, 
              { padding: isSmallDevice ? 15 : 20 }
            ]}>
              {/* Status badge - "UPCOMING" */}
              <View style={[
                styles.statusContainer, 
                { marginBottom: isLandscape ? 15 : 30 }
              ]}>
                <View style={styles.upcomingBadge}>
                  <Text style={styles.upcomingText}>UPCOMING</Text>
                </View>
              </View>
              
              {/* Doctor Profile Image */}
              <View style={[
                styles.profileContainer,
                { marginBottom: isSmallDevice ? 16 : 24 }
              ]}>
                <Image 
                  source={require('../../assets/images/appointprofile.png')}
                  style={[
                    styles.profileImage,
                    { 
                      width: isSmallDevice ? 100 : isLandscape ? 90 : 120,
                      height: isSmallDevice ? 100 : isLandscape ? 90 : 120,
                      borderRadius: isSmallDevice ? 50 : isLandscape ? 45 : 60,
                    }
                  ]}
                  resizeMode="cover"
                />
              </View>
              
              {/* Appointment text */}
              <Text style={[
                styles.appointmentText,
                { 
                  fontSize: isSmallDevice ? 18 : 21,
                  marginBottom: isSmallDevice ? 5 : 8 
                }
              ]}>
                Your upcoming appointment with
              </Text>
              
              {/* Doctor name */}
              <Text style={[
                styles.doctorName,
                { 
                  fontSize: isSmallDevice ? 17 : 20,
                  lineHeight: isSmallDevice ? 20 : 24,
                }
              ]}>
                Laurie Simons, MD, DipABLM
              </Text>
              
              {/* Spacing */}
              <View style={{ height: isLandscape ? 15 : 30 }} />
              
              {/* APPOINTMENT badge */}
              <View style={styles.appointmentBadge}>
                <Text style={styles.appointmentBadgeText}>Appointment</Text>
              </View>
              
              {/* Date and time */}
              <Text style={[
                styles.dateTimeText,
                { 
                  fontSize: isSmallDevice ? 16 : 18,
                  lineHeight: isSmallDevice ? 18 : 22,
                }
              ]}>
                Thu, December 21, 2024 | 10:00 AM PST
              </Text>
              
              {/* Separator line */}
              <View style={styles.separator} />
              
              {/* Meeting info section */}
              <View style={styles.meetingInfoContainer}>
                <Text style={[
                  styles.meetingLinkTitle,
                  { 
                    fontWeight: '700', // Changed from 600 to 700 for thicker text
                    fontSize: isSmallDevice ? 16 : 18,
                    lineHeight: isSmallDevice ? 20 : 22,
                  }
                ]}>
                  Meeting Link:
                </Text>
                <View style={{ height: 8 }} />
                <Text style={[
                  styles.meetingLinkText,
                  { 
                    fontSize: isSmallDevice ? 16 : 18,
                    lineHeight: isSmallDevice ? 20 : 22,
                  }
                ]}>
                  www.meet.google.com/abc-defa-dwa
                </Text>
              </View>
              
              {/* Extra space to ensure scrolling works properly with the fixed button */}
              <View style={{ height: isSmallDevice ? 80 : 100 }} />
            </View>
          </ScrollView>
          
          {/* Button fixed to bottom of screen but above the absolute bottom */}
          <View style={[
            styles.buttonContainer,
            { 
              bottom: isLandscape ? 20 : Platform.OS === 'ios' ? 40 : 30,
              paddingHorizontal: isSmallDevice ? 15 : 20,
            }
          ]}>
            <TouchableOpacity 
              style={styles.joinButton}
              onPress={handleJoinMeeting}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.joinButtonText,
                { fontSize: isSmallDevice ? 14 : 16 }
              ]}>
                Join meeting
              </Text>
              <Ionicons 
                name="arrow-forward" 
                size={isSmallDevice ? 18 : 20} 
                color="white" 
                style={styles.joinButtonIcon} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    // paddingTop handled dynamically
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  mainContentWrapper: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  statusContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  upcomingBadge: {
    backgroundColor: 'rgba(58, 155, 120, 1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(145, 145, 145, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingText: {
    fontFamily: 'Inter',
    fontWeight: '680',
    fontSize: 15,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'white',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    // Dimensions handled dynamically
  },
  appointmentText: {
    fontFamily: 'Inter',
    fontWeight: '700', // Increased from 600 to 700 for thicker text
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
  },
  doctorName: {
    fontFamily: 'Inter',
    fontWeight: '320',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(112, 112, 112, 1)',
  },
  appointmentBadge: {
    width: 120, // Increased from 100 to give more space for text
    height: 30,
    backgroundColor: 'rgba(122, 61, 182, 0.1)',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  appointmentBadgeText: {
    fontFamily: 'Inter',
    fontWeight: '700', // Increased from 600 to 700 for thicker text
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
    color: 'rgba(122, 61, 182, 1)',
  },
  dateTimeText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgba(112, 112, 112, 1)',
    marginBottom: 30, // Increased from 20 to 30 to move separator line lower
    marginTop: 5, // Space above date/time
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(236, 236, 236, 1)',
    width: '100%',
    marginBottom: 20,
  },
  meetingInfoContainer: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  meetingLinkTitle: {
    fontFamily: 'Inter',
    fontWeight: '700', // Increased from 600 to 700 for thicker text
    color: 'rgba(0, 0, 0, 1)',
    letterSpacing: 0,
  },
  meetingLinkText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    letterSpacing: 0,
    color: 'rgba(112, 112, 112, 1)',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: 'rgba(67, 132, 230, 1)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  joinButtonText: {
    color: 'white',
    fontFamily: 'Inter',
    fontWeight: '500',
    marginRight: 8,
  },
  joinButtonIcon: {
    transform: [{ rotate: '-45deg' }] // Changed from 45deg to -45deg to point northeast
  }
});

export default AppointmentScreen;