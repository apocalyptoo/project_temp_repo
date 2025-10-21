// src/screens/Player/PlayerDashboard.js
import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { AuthContext } from '../../contexts/AuthContext';

const screenWidth = Dimensions.get('window').width;
const CARD_SIZE = (screenWidth - 48) / 2;

export default function PlayerDashboard({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  const actions = [
    { title: 'Teams', icon: require('../../../assets/icons/ball.png'), screen: 'Teams' },
    { title: 'My Teams', icon: require('../../../assets/icons/myteam.png'), screen: 'MyTeams' },
    { title: 'Players', icon: require('../../../assets/icons/player.png'), screen: 'Players' },
    { title: 'Invites', icon: require('../../../assets/icons/invite.png'), screen: 'Invites' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.header}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.headerText}>
          Welcome Back 👋
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(150)} style={styles.headerName}>
          {user?.name}
        </Animated.Text>
      </LinearGradient>

      {/* Profile Card */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.profileCard}>
        <Image
          source={require('../../../assets/icons/profile.png')}
          style={styles.profileIcon}
        />
        <Text style={styles.fullName}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </Animated.View>

      {/* Action Grid */}
      <FlatList
        data={actions}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFFFFF', '#a1d3f5ff']}
                style={styles.gradientCard}
              >
                <Image source={item.icon} style={styles.cardIcon} resizeMode="contain" />
                <Text style={styles.cardText}>{item.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {/* Floating Logout */}
      <TouchableOpacity style={styles.floatingButton} onPress={logout}>
        <Image
          source={require('../../../assets/icons/lgout.png')}
          style={styles.floatingIcon}
        />
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#E0F2FE', 
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 4,
    backgroundColor: '#1E3A8A',
  },
  headerText: {
    fontSize: 18,
    color: '#E0F2FE',
    fontWeight: '400',
  },
  headerName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
  },
  profileCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginTop: -30,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  profileIcon: { width: 80, height: 80, marginBottom: 8 },
  fullName: { fontSize: 18, fontWeight: '700', color: '#1E3A8A', marginBottom: 4 },
  email: { fontSize: 14, color: '#555' },
  grid: { paddingVertical: 16, paddingHorizontal: 12 },
  card: {
    width: CARD_SIZE,
    borderRadius: 16,
    margin: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  gradientCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    borderRadius: 16,
    backgroundColor: '#000000ff', 
  },
  cardIcon: { width: 50, height: 50, marginBottom: 8 },
  cardText: { fontSize: 16, fontWeight: '600', color: '#1E3A8A' },
  floatingButton: {
    position: 'absolute',
    bottom: 26,
    right: 26,
    backgroundColor: '#2563EB',
    borderRadius: 30,
    padding: 14,
    elevation: 5,
  },
  floatingIcon: { width: 28, height: 28, tintColor: '#fff' },
});
