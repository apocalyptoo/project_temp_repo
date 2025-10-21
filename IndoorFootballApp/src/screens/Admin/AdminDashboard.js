// src/screens/Admin/AdminDashboard.js
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function AdminDashboard({ navigation }) {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    Alert.alert('Confirm', 'Do you want to logout?', [
      { text: 'Cancel' },
      { text: 'Logout', style: 'destructive', onPress: async () => {
        await logout();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* Navigation buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Manage Users" onPress={() => navigation.navigate('ManageUsers')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Manage Teams" onPress={() => navigation.navigate('ManageTeams')} />
      </View>

      {/* Logout button */}
      <View style={[styles.buttonContainer, { marginTop: 40 }]}>
        <Button title="Logout" color="#d9534f" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 40, textAlign: 'center' },
  buttonContainer: { marginVertical: 12 }
});
