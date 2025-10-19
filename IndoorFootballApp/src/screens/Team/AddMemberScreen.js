import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
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

  useEffect(() => { loadPlayers(); }, []);

  const invite = async (userId) => {
    try {
      const res = await api.post(`/teams/${teamId}/invite`, { userId });
      Alert.alert('Success', 'Invite sent');
      navigation.goBack();
    } catch (err) {
      console.error(err?.response?.data || err.message);
      Alert.alert('Error', err?.response?.data?.error || 'Failed to invite player');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add member to team #{teamId}</Text>
      <FlatList
        data={players}
        keyExtractor={(p) => String(p.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
            <Button title="Invite" onPress={() => invite(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 12 }}>No players found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }
});