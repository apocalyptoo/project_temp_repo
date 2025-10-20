// src/screens/Invites/InvitesScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../api/api';

const PRIMARY_COLOR = '#3C6E71';
const ACCENT_COLOR = '#284B63';
const BG_COLOR = '#F1FAFB';

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

  const rejectInvite = async (teamId) => {
    try {
      await api.post(`/teams/${teamId}/reject`);
      Alert.alert('Rejected', 'Invite rejected.');
      loadInvites();
    } catch (err) {
      console.error('rejectInvite', err?.response?.data || err.message);
      const msg = err?.response?.data?.error || 'Failed to reject invite';
      Alert.alert('Error', msg);
    }
  };

  useEffect(() => { loadInvites(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team Invites</Text>

      {loading ? (
        <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={invites}
          keyExtractor={i => String(i.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.teamName}>{item.team?.name || `Team ${item.teamId}`}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.acceptButton]}
                  onPress={() => acceptInvite(item.teamId)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.rejectButton]}
                  onPress={() => rejectInvite(item.teamId)}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshing={loading}
          onRefresh={loadInvites}
          ListEmptyComponent={<Text style={styles.emptyText}>No pending invites</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: ACCENT_COLOR,
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '700',
    color: ACCENT_COLOR,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: PRIMARY_COLOR,
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});
