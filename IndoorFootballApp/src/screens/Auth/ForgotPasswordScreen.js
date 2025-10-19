import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import api from '../../api/api';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      await api.post('/auth/forgot', { email: email.trim() });
      Alert.alert('Success', 'If that email exists, a reset link was sent.');
      navigation.goBack();
    } catch (err) {
      console.error(err?.response?.data || err.message);
      Alert.alert('Error', 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset password</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <Button title="Send reset link" onPress={submit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, justifyContent:'center' },
  title: { fontSize:18, marginBottom:12, textAlign:'center' },
  input: { borderWidth:1, borderColor:'#ddd', padding:8, marginBottom:8, borderRadius:6 }
});