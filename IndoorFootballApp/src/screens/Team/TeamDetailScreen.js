// src/screens/Team/TeamDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function TeamDetailScreen({ route, navigation }) {
  const { team } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.header}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.headerTitle}>
          {team.name}
        </Animated.Text>
      </LinearGradient>

      {/* Team Info Card */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.infoCard}>
        <Text style={styles.teamDescription}>{team.description || 'No description provided.'}</Text>
        <Text style={styles.meta}>Owner ID: {team.ownerId}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddMember', { teamId: team.id })}
        >
          <Text style={styles.addButtonText}>+ Add New Member</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Members List */}
      <FlatList
        data={team.members || []}
        keyExtractor={(m) => String(m.userId || m.id)}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.memberTitle}>
            Members ({team.members?.length || 0})
          </Text>
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)}>
            <LinearGradient
              colors={['#FFFFFF', '#a1d3f5ff']}
              style={[styles.memberCard, { padding: 12, borderRadius: 16, marginBottom: 10 }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../../assets/icons/profile.png')}
                  style={styles.avatar}
                />
                <View style={{ marginLeft: 12 }}>
                  <Text style={[styles.memberName, { color: '#1E3A8A' }]}>
                    {item.user?.name || item.name || `User ${item.userId}`}
                  </Text>
                  <Text style={[styles.memberEmail, { color: '#333' }]}>
                    {item.user?.email || item.email || ''}
                  </Text>
                  <Text style={[styles.memberStatus, { color: '#555' }]}>
                    {item.status || 'Member'}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No members yet.</Text>}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    marginTop: -30,
    elevation: 5,
  },
  teamDescription: { fontSize: 15, color: '#333', marginBottom: 10 },
  meta: { fontSize: 13, color: '#555', marginBottom: 12 },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  list: { paddingHorizontal: 16, paddingTop: 20 },
  memberTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  avatar: { width: 40, height: 40, marginRight: 12 },
  memberName: { fontWeight: '700', fontSize: 15, color: '#1E3A8A' },
  memberEmail: { color: '#555', fontSize: 13 },
  memberStatus: { color: '#777', fontSize: 12, marginTop: 2 },
  empty: { textAlign: 'center', color: '#777', marginTop: 20 },
});
