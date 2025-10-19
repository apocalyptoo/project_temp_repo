// src/screens/Team/TeamsListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import api from '../../api/api';

export default function TeamsListScreen({ navigation }) {
  const [teams, setTeams] = useState([]);

  const loadTeams = async () => {
    try {
      const res = await api.get('/teams');
      setTeams(res.data);
    } catch (err) {
      console.error('loadTeams', err.message);
    }
  };

  useEffect(() => { const t = navigation.addListener('focus', loadTeams); loadTeams(); return t; }, []);

  return (
    <View style={styles.container}>
      <Button title="Create Team" onPress={() => navigation.navigate('CreateTeam')} />
      <FlatList
        data={teams}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.teamCard}>
            <Text style={styles.teamName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Owner ID: {item.ownerId}</Text>
            <Text>Members: {item.members?.length || 0}</Text>
            
          </View>
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
