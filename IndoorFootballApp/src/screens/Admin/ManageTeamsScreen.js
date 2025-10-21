import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import api from '../../api/api';

export default function ManageTeamsScreen() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/teams');
      setTeams(res.data || []);
    } catch (err) {
      console.error('Failed to load teams', err);
      Alert.alert('Error', err.response?.data?.error || 'Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleDelete = (teamId) => {
    Alert.alert('Confirm', 'Delete this team?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setDeletingId(teamId);
            await api.delete(`/admin/teams/${teamId}`);
            await loadTeams();
            Alert.alert('Deleted', 'Team deleted successfully.');
          } catch (err) {
            Alert.alert('Error', 'Failed to delete team');
          } finally {
            setDeletingId(null);
          }
        },
      },
    ]);
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );

  if (!teams.length)
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No teams found.</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.header}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.headerText}>
          Manage Teams
        </Animated.Text>
      </LinearGradient>

      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)}>
            <LinearGradient
              colors={['#FFFFFF', '#a1d3f5ff']}
              style={{
                padding: 16,
                borderRadius: 16,
                marginBottom: 12,
                elevation: 2,
              }}
            >
              <Text style={[styles.title, { color: '#1E3A8A' }]}>{item.name}</Text>
              <Text style={[styles.sub, { color: '#333' }]}>
                Owner: {item.owner?.name || item.ownerId}
              </Text>
              <Text style={[styles.date, { color: '#555' }]}>
                Created: {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  { backgroundColor: '#3B82F6', paddingVertical: 8, borderRadius: 10, marginTop: 12 },
                ]}
                onPress={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
              >
                <Text style={[styles.deleteText, { color: '#fff' }]}>
                  {deletingId === item.id ? 'Deleting...' : 'Delete Team'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#1E3A8A' },
  sub: { marginTop: 6, color: '#333' },
  date: { marginTop: 4, color: '#666', fontSize: 12 },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: { color: '#fff', fontWeight: '700' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#555', fontSize: 16 },
});
