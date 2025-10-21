// src/screens/Team/MyTeamsScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import api from '../../api/api';

export default function MyTeamsScreen({ navigation }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMyTeams = async () => {
    setLoading(true);
    try {
      const res = await api.get('/teams/me');
      setTeams(res.data);
    } catch (err) {
      console.error('loadMyTeams', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyTeams();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.header}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.headerTitle}>
          My Teams
        </Animated.Text>
      </LinearGradient>

      {/* Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => String(item.id)}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={loadMyTeams} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>You’re not part of any team yet.</Text>}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(index * 100)}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TeamDetail', { team: item })}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#a1d3f5ff']}
                  style={styles.card} // keep your padding, borderRadius, elevation
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../../../assets/icons/mtm.png')}
                      style={styles.icon}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.teamName, { color: '#1E3A8A' }]}>{item.name}</Text>
                      <Text numberOfLines={2} style={[styles.teamDescription, { color: '#333' }]}>
                        {item.description}
                      </Text>
                      <Text style={[styles.meta, { color: '#555' }]}>
                        Members: {item.members?.length || 0}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
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
  list: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 12,
    tintColor: '#1E3A8A',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  teamDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  meta: {
    fontSize: 13,
    color: '#777',
    marginTop: 8,
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 30,
  },
});
