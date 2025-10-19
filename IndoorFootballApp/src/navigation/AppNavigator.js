// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../contexts/AuthContext';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import PlayerDashboard from '../screens/Player/PlayerDashboard';
import PlayersListScreen from '../screens/Player/PlayersListScreen';
import InvitesScreen from '../screens/Player/InvitesScreen';
import TeamsListScreen from '../screens/Team/TeamsListScreen';
import CreateTeamScreen from '../screens/Team/CreateTeamScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or splash

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          // Auth stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : user.role === 'PLAYER' ? (
          // Player stack
          <>
            <Stack.Screen name="PlayerDashboard" component={PlayerDashboard} />
            <Stack.Screen name="Teams" component={TeamsListScreen} />
            <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
            <Stack.Screen name="Players" component={PlayersListScreen} />
            {/* <Stack.Screen name="Invites" component={InvitesScreen} />          {/* NEW */}
          </>
        ) : user.role === 'OWNER' ? (
          // Owner stack (placeholder; similar to player)
          <>
            <Stack.Screen name="OwnerDashboard" component={() => null /* implement */} />
            <Stack.Screen name="Teams" component={TeamsListScreen} />
            <Stack.Screen name="Players" component={PlayersListScreen} />
            {/* <Stack.Screen name="Invites" component={InvitesScreen} />          {/* NEW */}
          </>
        ) : (
          <>
            <Stack.Screen name="PlayerDashboard" component={PlayerDashboard} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
