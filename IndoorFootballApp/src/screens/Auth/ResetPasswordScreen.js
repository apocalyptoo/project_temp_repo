import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../../api/api';

export default function ResetPasswordScreen({ navigation }) {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!token || !password) return Alert.alert('Error', 'Token and new password required');
    setLoading(true);
    try {
      await api.post('/auth/reset', { token, password });
      Alert.alert('Success', 'Password reset successful. You can now log in.');
      navigation.navigate('Login');
    } catch (err) {
      console.error(err?.response?.data || err.message);
      Alert.alert('Error', err?.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set new password</Text>
      <TextInput placeholder="Reset token" value={token} onChangeText={setToken} style={styles.input} />
      <TextInput placeholder="New password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Set password" onPress={submit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, justifyContent:'center' },
  title: { fontSize:18, marginBottom:12, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ddd', padding:8, marginBottom:8, borderRadius:6 }
});