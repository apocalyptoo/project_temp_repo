// src/screens/Player/PlayerDashboard.js
import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function PlayerDashboard({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  return (
    <View style={{ flex:1, padding: 16 }}>
      <Text style={{fontSize:18, marginBottom:12}}>Welcome, {user?.name}</Text>
      <Button title="Teams" onPress={() => navigation.navigate('Teams')} />
      <View style={{ marginTop: 8 }} />
      <Button title="Players" onPress={() => navigation.navigate('Players')} />
      <View style={{ marginTop: 8 }} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
