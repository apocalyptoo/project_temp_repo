import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

export default function TeamDetailScreen({ route, navigation }) {
  const { team } = route.params; // team object passed from MyTeamsScreen

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{team.name}</Text>
      {team.description ? <Text style={{ marginBottom: 10 }}>{team.description}</Text> : null}
      <Text style={{ marginBottom: 8 }}>Owner ID: {team.ownerId}</Text>

      <View style={{ marginBottom: 12 }}>
        <Button title="Add new member" onPress={() => navigation.navigate('AddMember', { teamId: team.id })} />
      </View>

      <Text style={styles.subTitle}>Members ({team.members?.length || 0})</Text>
      <FlatList
        data={team.members || []}
        keyExtractor={(m) => String(m.userId || m.id)}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <Text style={{ fontWeight: '600' }}>{item.user?.name || item.name || `User ${item.userId}`}</Text>
            <Text>{item.user?.email || item.email || ''}</Text>
            <Text style={{ color: '#666' }}>{item.status || ''}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ padding: 12 }}>No members yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  subTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  memberRow: { paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' }
});