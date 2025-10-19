import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, Alert, StyleSheet } from 'react-native';
import api from '../../api/api';

export default function InvitesScreen() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInvites = async () => {
    setLoading(true);
    try {
      const res = await api.get('/players/invites');
      setInvites(res.data);
    } catch (err) {
      console.error('loadInvites', err?.response?.data || err.message);
      Alert.alert('Error', 'Failed to load invites');
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (teamId) => {
    try {
      await api.post(`/teams/${teamId}/accept`);
      Alert.alert('Joined', 'You have joined the team.');
      loadInvites();
    } catch (err) {
      console.error('acceptInvite', err?.response?.data || err.message);
      const msg = err?.response?.data?.error || 'Failed to accept invite';
      Alert.alert('Error', msg);
    }
  };

  useEffect(() => { loadInvites(); }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={invites}
        keyExtractor={i => String(i.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.teamName}>{item.team?.name || `Team ${item.teamId}`}</Text>
            <Text>Status: {item.status}</Text>
            <View style={{ marginTop: 8 }}>
              <Button title="Accept" onPress={() => acceptInvite(item.teamId)} />
            </View>
          </View>
        )}
        refreshing={loading}
        onRefresh={loadInvites}
        ListEmptyComponent={<Text style={{ padding: 12 }}>No pending invites</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8 },
  teamName: { fontWeight: '700', fontSize: 16 }
});