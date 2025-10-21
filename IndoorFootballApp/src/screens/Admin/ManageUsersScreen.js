import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../api/api';

export default function ManageUsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to load users', err);
      Alert.alert('Error', err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = (id) => {
    const confirmDelete = async () => {
      try {
        setDeletingId(id);
        await api.delete(`/admin/users/${id}`);
        await loadUsers();
        Alert.alert('Success', 'User deleted successfully');
      } catch (err) {
        console.error('Delete user failed', err);
        Alert.alert('Error', err.response?.data?.error || 'Failed to delete user');
      } finally {
        setDeletingId(null);
      }
    };

    Alert.alert('Confirm', 'Delete this user?', [
      { text: 'Cancel' },
      { text: 'Yes', style: 'destructive', onPress: confirmDelete }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!users.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No users found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name} ({item.email})</Text>
          <Text style={styles.role}>Role: {item.role}</Text>
          <Button
            title={deletingId === item.id ? 'Deleting...' : 'Delete User'}
            color="#d9534f"
            onPress={() => deleteUser(item.id)}
            disabled={deletingId === item.id}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { backgroundColor: '#fff', padding: 12, marginBottom: 12, borderRadius: 10, elevation: 2 },
  name: { fontSize: 16, fontWeight: '600' },
  role: { fontSize: 14, color: '#666', marginBottom: 6 },
  emptyText: { fontSize: 16, color: '#666' },
});
