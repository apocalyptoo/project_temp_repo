// src/screens/Team/CreateTeamScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../../api/api';

export default function CreateTeamScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onCreate = async () => {
    try {
      const res = await api.post('/teams/create', { name, description });
      Alert.alert('Team created', `Team ${res.data.name} created`);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.error || err.message || 'Failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Team name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <Button title="Create" onPress={onCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginBottom: 8, borderRadius: 6 }
});
