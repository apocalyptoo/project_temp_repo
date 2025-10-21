import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
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
    const confirmDelete = async () => {
      try {
        setDeletingId(teamId);
        await api.delete(`/admin/teams/${teamId}`);
        await loadTeams();
        Alert.alert('Deleted', 'Team was deleted successfully.');
      } catch (err) {
        console.error('Delete team failed', err);
        Alert.alert('Error', err.response?.data?.error || 'Failed to delete team');
      } finally {
        setDeletingId(null);
      }
    };

    Alert.alert('Confirm', 'Are you sure you want to delete this team?', [
      { text: 'Cancel' },
      { text: 'Delete', style: 'destructive', onPress: confirmDelete }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!teams.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No teams found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={teams}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>

          <Text style={styles.sub}>Owner: {item.owner?.name || item.ownerId}</Text>
          {item.owner?.email ? <Text style={styles.sub}>Owner email: {item.owner.email}</Text> : null}

          <View style={styles.actions}>
            <Button
              title={deletingId === item.id ? 'Deleting...' : 'Delete Team'}
              color="#d9534f"
              onPress={() => handleDelete(item.id)}
              disabled={deletingId === item.id}
            />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { backgroundColor: '#fff', padding: 12, marginBottom: 12, borderRadius: 10, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700' },
  date: { fontSize: 12, color: '#666' },
  sub: { marginTop: 6, color: '#444' },
  actions: { marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end' },
  emptyText: { fontSize: 16, color: '#666' },
});
