// src/screens/Admin/ManageUsersScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import api from '../../api/api';

export default function ManageUsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('loadUsers', err.message);
      Alert.alert('Error', 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setDeletingId(id);
            await api.delete(`/admin/users/${id}`);
            await loadUsers();
            Alert.alert('Success', 'User deleted successfully.');
          } catch (err) {
            console.error('Delete user failed', err);
            Alert.alert('Error', err.response?.data?.error || 'Failed to delete user.');
          } finally {
            setDeletingId(null);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.header}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.headerTitle}>
          Manage Users
        </Animated.Text>
      </LinearGradient>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 30 }} />
      ) : (
      <FlatList
        data={users}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 80)}>
            <LinearGradient
              colors={['#FFFFFF', '#a1d3f5ff']}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
                marginBottom: 12,
                elevation: 2,
              }}
            >
              <Image
                source={require('../../../assets/icons/player.png')}
                style={styles.icon}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={[styles.name, { color: '#1E3A8A', fontWeight: '700' }]}>{item.name}</Text>
                <Text style={[styles.email, { color: '#333' }]}>{item.email}</Text>
                <Text style={[styles.role, { color: '#555' }]}>Role: {item.role}</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  {
                    backgroundColor: deletingId === item.id ? '#9CA3AF' : '#3B82F6',
                    paddingVertical: 8,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    marginLeft: 8,
                  },
                ]}
                onPress={() => deleteUser(item.id)}
                disabled={deletingId === item.id}
              >
                <Text style={[styles.deleteText, { color: '#fff', fontWeight: '600' }]}>
                  {deletingId === item.id ? 'Deleting...' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No users found</Text>}
      />

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 12,
    tintColor: '#1E3A8A',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  role: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});
