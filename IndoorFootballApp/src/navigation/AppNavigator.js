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
import MyTeamsScreen from '../screens/Team/MyTeamsScreen';
import TeamDetailScreen from '../screens/Team/TeamDetailScreen';
import AddMemberScreen from '../screens/Team/AddMemberScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : user.role === 'PLAYER' ? (
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
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}