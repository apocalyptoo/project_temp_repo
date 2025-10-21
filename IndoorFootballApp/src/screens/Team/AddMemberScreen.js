

// src/screens/Team/AddMemberScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import api from '../../api/api';

export default function AddMemberScreen({ route, navigation }) {
  const { teamId } = route.params;
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPlayers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/players');
      setPlayers(res.data);
    } catch (err) {
      console.error(err?.response?.data || err.message);
      Alert.alert('Error', 'Failed to load players');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const invite = async (userId) => {
  try {
    await api.post(`/teams/${teamId}/invite`, { userId });
    Alert.alert(
      'Success',
      'Invite sent',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  } catch (err) {
    Alert.alert('Error', err?.response?.data?.error || 'Failed to invite player');
  }
};


  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.header}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.headerTitle}>
          Add Members
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(100)} style={styles.subHeader}>
          Team #{teamId}
        </Animated.Text>
      </LinearGradient>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(p) => String(p.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No players found.</Text>}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(index * 100)}>
              <LinearGradient
                colors={['#FFFFFF', '#a1d3f5ff']}
                style={[styles.row, { padding: 12, borderRadius: 16, marginBottom: 10 }]}
              >
                <Image
                  source={require('../../../assets/icons/profile.png')}
                  style={styles.avatar}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={[styles.name, { color: '#1E3A8A' }]}>{item.name}</Text>
                  <Text style={[styles.email, { color: '#333' }]}>{item.email}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.inviteButton, { backgroundColor: '#3B82F6' }]}
                  onPress={() => invite(item.id)}
                >
                  <Text style={[styles.inviteText, { color: '#fff' }]}>Invite</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          )}
        />

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#E0F2FE',
    textAlign: 'center',
    marginTop: 4,
  },
  list: { paddingHorizontal: 16, paddingTop: 20 },
  row: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  avatar: { width: 40, height: 40, marginRight: 12 },
  name: { fontWeight: '700', fontSize: 15, color: '#1E3A8A' },
  email: { color: '#555', fontSize: 13 },
  inviteButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  inviteText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },
});
