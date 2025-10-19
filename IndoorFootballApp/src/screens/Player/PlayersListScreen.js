// src/screens/Player/PlayersListScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import api from '../../api/api';

export default function PlayersListScreen() {
  const [players, setPlayers] = useState([]);

  const loadPlayers = async () => {
    try {
      const res = await api.get('/players');
      setPlayers(res.data);
    } catch (err) {
      console.error('loadPlayers', err.message);
    }
  };

  useEffect(() => { loadPlayers(); }, []);

  return (
    <View style={styles.container}>
      <FlatList data={players} keyExtractor={i => String(i.id)} renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  row: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8 },
  name: { fontWeight: '700' }
});
