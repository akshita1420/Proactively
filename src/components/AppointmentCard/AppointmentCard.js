import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppointmentCard = ({ screenWidth = Dimensions.get('window').width }) => {
  const navigation = useNavigation();
  
  const isSmallDevice = screenWidth < 360;
  
  const cardWidth = Math.min(screenWidth * 0.9, 370);
  const imageSize = isSmallDevice ? 55 : 65;
  const nameFontSize = isSmallDevice ? 17 : 20;
  const specialtyFontSize = isSmallDevice ? 13 : 15;
  const dateFontSize = isSmallDevice ? 13 : 15;
  
  const handlePress = () => {
    navigation.navigate('AppointmentScreen');
  };
  
  return (
    <View style={{ marginTop:7}}>
      <TouchableOpacity 
        style={[styles.card, { width: cardWidth }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={24} color="rgba(145, 145, 145, 1)" />
        </View>
        
        <View style={styles.upcomingBadge}>
          <Text style={styles.upcomingText}>UPCOMING</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.leftContent}>
            <View style={styles.nameRow}>
              <Text style={[styles.doctorName, { fontSize: nameFontSize }]}>
                Laurie Simons
              </Text>
              <Text style={[styles.credentials, { fontSize: isSmallDevice ? 12 : 13 }]}>
                MD, DipABLM...
              </Text>
            </View>
            
            <Text style={[styles.specialty, { fontSize: specialtyFontSize }]}>
              Internal medicine
            </Text>
          </View>
          
          <View style={styles.profileImageContainer}>
            <Image 
              source={require('../../../assets/images/appointprofile.png')}
              style={[styles.profileImage, { width: imageSize, height: imageSize, borderRadius: imageSize/2 }]}
              resizeMode="cover"
            />
          </View>
        </View>
        
        <View style={styles.dateTimeContainer}>
          <Text style={[styles.dateTimeText, { fontSize: dateFontSize }]}>
            Thu, December 21, 2024 | 10:00 AM PST
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(236, 236, 236, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 18,
    position: 'relative',
    marginBottom: 15,
  },
  arrowContainer: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  upcomingBadge: {
    position: 'absolute',
    width: 90,
    height: 24,
    top: 18,
    left: 18,
    backgroundColor: 'rgba(58, 155, 120, 1)',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(145, 145, 145, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingText: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'white',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 16,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: 4,
  },
  doctorName: {
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.18,
    color: 'rgba(0, 0, 0, 1)',
    flexShrink: 1,
  },
  credentials: {
    marginLeft: 4,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.7)',
    flexShrink: 0,
  },
  specialty: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    color: 'rgba(112, 112, 112, 1)',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  profileImage: {
  },
  dateTimeContainer: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
  },
  dateTimeText: {
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 20,
    color: 'rgba(112, 112, 112, 1)',
  }
});

export default AppointmentCard;