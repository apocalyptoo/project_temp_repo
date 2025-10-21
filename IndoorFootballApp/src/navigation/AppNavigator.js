

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../contexts/AuthContext';

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';

// Player Screens
import PlayerDashboard from '../screens/Player/PlayerDashboard';
import PlayersListScreen from '../screens/Player/PlayersListScreen';
import InvitesScreen from '../screens/Player/InvitesScreen';
import TeamsListScreen from '../screens/Team/TeamsListScreen';
import CreateTeamScreen from '../screens/Team/CreateTeamScreen';
import MyTeamsScreen from '../screens/Team/MyTeamsScreen';
import TeamDetailScreen from '../screens/Team/TeamDetailScreen';
import AddMemberScreen from '../screens/Team/AddMemberScreen';

// Admin Screens
import AdminDashboard from '../screens/Admin/AdminDashboard';
import ManageUsersScreen from '../screens/Admin/ManageUsersScreen';
import ManageTeamsScreen from '../screens/Admin/ManageTeamsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {/* If user is NOT logged in */}
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          </>
        ) : user.role === 'PLAYER' ? (
          /* If user is a PLAYER */
          <>
            <Stack.Screen name="PlayerDashboard" component={PlayerDashboard} />
            <Stack.Screen name="Teams" component={TeamsListScreen} />
            <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
            <Stack.Screen name="MyTeams" component={MyTeamsScreen} />
            <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
            <Stack.Screen name="AddMember" component={AddMemberScreen} />
            <Stack.Screen name="Players" component={PlayersListScreen} />
            <Stack.Screen name="Invites" component={InvitesScreen} />
          </>
        ) : user.role === 'ADMIN' ? (
          /* If user is an ADMIN */
          <>
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
            <Stack.Screen name="ManageTeams" component={ManageTeamsScreen} />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
