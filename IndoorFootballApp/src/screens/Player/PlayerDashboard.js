// src/screens/Player/PlayerDashboard.js
/*import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function PlayerDashboard({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={{ flex:1, padding: 16 }}>
      <Text style={{fontSize:18, marginBottom:12}}>Welcome, {user?.name}</Text>
      <Button title="Teams" onPress={() => navigation.navigate('Teams')} />
      <View style={{ marginTop: 8 }} />
      <Button title="My Teams" onPress={() => navigation.navigate('MyTeams')} />
      <View style={{ marginTop: 8 }} />
      <Button title="Players" onPress={() => navigation.navigate('Players')} />
      <View style={{ marginTop: 8 }} />
      <Button title="Invites" onPress={() => navigation.navigate('Invites')} />
      <View style={{ marginTop: 8 }} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}


// src/screens/Player/PlayerDashboard.js
// src/screens/Player/PlayerDashboard.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

const screenWidth = Dimensions.get('window').width;
const CARD_SIZE = (screenWidth - 48) / 2; // 2 cards per row, with margins

export default function PlayerDashboard({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  // 👇 Make sure to place your PNGs inside /assets/icons/
  const actions = [
    { title: 'Teams', icon: require('../../../assets/icons/ball.png'), screen: 'Teams' },
    { title: 'My Teams', icon: require('../../../assets/icons/myteam.png'), screen: 'MyTeams' },
    { title: 'Players', icon: require('../../../assets/icons/player.png'), screen: 'Players' },
    { title: 'Invites', icon: require('../../../assets/icons/invite.png'), screen: 'Invites' },
    { title: 'Logout', icon: require('../../../assets/icons/ball.png'), action: logout },
  ];

  return (
    <View style={styles.container}>
      
      <View style={styles.profileCard}>
        <Image
          source={require('../../../assets/icons/profile.png')} // your custom profile icon
          style={styles.profileIcon}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

    
      <FlatList
        data={actions}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => (item.action ? item.action() : navigation.navigate(item.screen))}
          >
            <Image source={item.icon} style={styles.cardIcon} resizeMode="contain" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  profileIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  role: {
    fontSize: 14,
    color: '#4B9CD3',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  grid: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: CARD_SIZE,
    elevation: 2,
  },
  cardIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

*/

// src/screens/Player/PlayerDashboard.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

const screenWidth = Dimensions.get('window').width;
const CARD_SIZE = (screenWidth - 48) / 2;

const PRIMARY_COLOR = '#3C6E71';
const ACCENT_COLOR = '#284B63';
const BG_COLOR = '#F1FAFB';

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
      {/* Top Player Info Card */}
      <View style={styles.profileCard}>
        <Image
          source={require('../../../assets/icons/profile.png')}
          style={styles.profileIcon}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      {/* Grid of Action Cards */}
      <FlatList
        data={actions}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Image source={item.icon} style={styles.cardIcon} resizeMode="contain" />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Ribbon */}
      <View style={styles.bottomRibbon}>
        <TouchableOpacity style={styles.ribbonButton} onPress={() => navigation.navigate('PlayerDashboard')}>
          <Image source={require('../../../assets/icons/home.png')} style={styles.ribbonIcon} resizeMode="contain" />
          <Text style={styles.ribbonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.ribbonButton} onPress={logout}>
          <Image source={require('../../../assets/icons/logout.png')} style={styles.ribbonIcon} resizeMode="contain" />
          <Text style={styles.ribbonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  profileIcon: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: ACCENT_COLOR,
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  role: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  grid: {
    paddingBottom: 90, // space for ribbon
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    width: CARD_SIZE,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: ACCENT_COLOR,
    fontWeight: '500',
  },
  bottomRibbon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
  },
  ribbonButton: {
    alignItems: 'center',
  },
  ribbonIcon: {
    width: 28,
    height: 28,
    marginBottom: 2,
  },
  ribbonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
