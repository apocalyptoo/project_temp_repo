// src/screens/Auth/RegisterScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PLAYER');

  const onRegister = async () => {
    try {
      const res = await register(name, email.trim(), password, role);
      Alert.alert('Registered', res?.message || 'Check your email to verify');
      navigation.navigate('Login');
    } catch (err) {
      Alert.alert('Error', err.message || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Full name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <View style={{ marginVertical: 8 }}>
        <Text>Role</Text>
        {/* Simple select - Picker may need @react-native-picker/picker if RN removed it */}
        <TextInput value={role} onChangeText={setRole} style={styles.input} />
      </View>
      <Button title="Register" onPress={onRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginBottom: 8, borderRadius: 6 },
});
