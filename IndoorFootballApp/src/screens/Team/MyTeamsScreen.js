import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
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

  useEffect(() => { loadMyTeams(); }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadMyTeams} />}
        ListEmptyComponent={<Text style={{ padding: 12 }}>You are not in or owner of any teams.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TeamDetail', { team: item })} style={styles.teamCard}>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text numberOfLines={2}>{item.description}</Text>
            <Text style={{ marginTop: 6 }}>Members: {item.members?.length || 0}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  teamCard: { marginVertical: 8, padding: 12, borderRadius: 8, borderColor: '#ddd', borderWidth: 1 },
  teamName: { fontWeight: '700', fontSize: 16 }
});