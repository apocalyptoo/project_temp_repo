// src/screens/Auth/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      const res = await login(email.trim(), password);
      if (!res.success) Alert.alert('Login failed', res.error || 'Check credentials');
    } catch (err) {
      Alert.alert('Error', err.message || 'Login error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indoor Football — Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={onLogin} />
      <View style={{ marginTop: 12 }}>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>

      {/* NEW: Forgot password */}
      <View style={{ marginTop: 12 }}>
        <Button title="Forgot password?" onPress={() => navigation.navigate('ForgotPassword')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 20, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginBottom: 8, borderRadius: 6 },
});
