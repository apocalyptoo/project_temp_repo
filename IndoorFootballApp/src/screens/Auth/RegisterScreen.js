// src/screens/Auth/RegisterScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
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
      <Text style={styles.title}>Create Your Account</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Role (PLAYER / OWNER)"
          value={role}
          onChangeText={setRole}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const PRIMARY_COLOR = '#3C6E71';
const ACCENT_COLOR = '#284B63';
const BG_COLOR = '#F1FAFB';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: '700', color: ACCENT_COLOR, marginBottom: 40, textAlign: 'center' },
  form: { width: '100%', backgroundColor: '#FFFFFF', borderRadius: 16, paddingVertical: 32, paddingHorizontal: 24, elevation: 4 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 10, fontSize: 16, color: '#333' },
  registerButton: { backgroundColor: PRIMARY_COLOR, paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginText: { color: '#555', fontSize: 14 },
  loginLink: { color: PRIMARY_COLOR, fontWeight: '600', fontSize: 14 },
});
