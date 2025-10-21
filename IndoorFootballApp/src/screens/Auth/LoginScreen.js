
// src/screens/Auth/LoginScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure you have this installed

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = async () => {
    try {
      const res = await login(email.trim(), password);
      if (!res.success) Alert.alert('Login failed', res.error || 'Check your credentials');
    } catch (err) {
      Alert.alert('Error', err.message || 'Login error');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        {/* Replace with your logo */}
        <Image
          source={require('../../../assets/icons/ball.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brandName}>BRAND NAME</Text>
        <Text style={styles.slogan}>SLOGAN HERE</Text>
      </View>

      {/* Tabs (Login / Signup) */}
      <View style={styles.tabContainer}>
        <TouchableOpacity>
          <Text style={[styles.tabText, styles.activeTab]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.tabText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon name="email-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  brandName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginTop: 8,
  },
  slogan: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabText: {
    fontSize: 16,
    paddingVertical: 6,
    color: '#777',
    fontWeight: '500',
  },
  activeTab: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#000',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
