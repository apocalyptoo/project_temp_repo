// src/screens/Admin/AdminDashboard.js
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { AuthContext } from '../../contexts/AuthContext';
import api from '../../api/api'; // 

export default function AdminDashboard({ navigation }) {
  const { logout, user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    Alert.alert('Confirm', 'Do you want to logout?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  // Fetch system stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const actions = [
    {
      title: 'Manage Users',
      icon: require('../../../assets/icons/player.png'),
      screen: 'ManageUsers',
    },
    {
      title: 'Manage Teams',
      icon: require('../../../assets/icons/myteam.png'),
      screen: 'ManageTeams',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#1E3A8A', '#3B82F6']} style={styles.header}>
        <Animated.Text entering={FadeInDown.duration(500)} style={styles.headerText}>
          Manager Dashboard
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(150)} style={styles.headerName}>
          {user?.name}
        </Animated.Text>
      </LinearGradient>

      {/* ✅ System Summary */}
      <View style={styles.summaryContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#3B82F6" />
        ) : (
          <Animated.View entering={FadeInDown.delay(200)} style={styles.summaryBox}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{stats?.userCount ?? 0}</Text>
              <Text style={styles.summaryLabel}>Total Users</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{stats?.teamCount ?? 0}</Text>
              <Text style={styles.summaryLabel}>Total Teams</Text>
            </View>
          </Animated.View>
        )}
      </View>

      {/* Action Cards */}
      <FlatList
        data={actions}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#FFFFFF', '#E0F2FE']} style={styles.gradientCard}>
                <Image source={item.icon} style={styles.cardIcon} resizeMode="contain" />
                <Text style={styles.cardText}>{item.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {/* Floating Logout */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleLogout}>
        <Image
          source={require('../../../assets/icons/lgout.png')}
          style={styles.floatingIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F2FE' },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 4,
  },
  headerText: {
    fontSize: 20,
    color: '#E0F2FE',
    fontWeight: '400',
    textAlign: 'center',
  },
  headerName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 6,
  },
  summaryContainer: {
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 10,
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 3,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  grid: { paddingVertical: 16, paddingHorizontal: 12 },
  card: {
    width: (Dimensions.get('window').width - 48) / 2,
    borderRadius: 16,
    margin: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  gradientCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    borderRadius: 16,
  },
  cardIcon: { width: 50, height: 50, marginBottom: 8 },
  cardText: { fontSize: 16, fontWeight: '600', color: '#1E3A8A' },
  floatingButton: {
    position: 'absolute',
    bottom: 26,
    right: 26,
    backgroundColor: '#3B82F6',
    borderRadius: 30,
    padding: 14,
    elevation: 5,
  },
  floatingIcon: { width: 28, height: 28, tintColor: '#fff' },
});
