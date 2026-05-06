import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteProp } from '@react-navigation/native';

import LoginScreen from '../(tabs)/usuario/Login';
import RegistroUser from '../(tabs)/usuario/RegistroUser';
import GerenciamentoServico from '../(tabs)/servico/GerenciamentoServico';
import HomeScreen from './screens/HomeScreen';
import AboutCompanyScreen from './screens/AboutCompanyScreen';
import SearchFlightsScreen from './screens/SearchFlightsScreen';
import CadastroAtendimento from './agendamento/CadastroAtendimento';
import GerenciamentoUser from '../(tabs)/usuario/GerenciamentoUser';
import GerenciamentoAgendamentoUser from '../(tabs)/agendamento/GerenciamentoAgendamentoUser';
import GerenciamentoAgendamento from '../(tabs)/agendamento/GerenciamentoAgendamento';
import Relatorio from '../(tabs)/agendamento/Relatorio';
import AlterarSenhaScreen from '../(tabs)/usuario/AlterarSenha';
import RedefinirSenhaScreen from '../(tabs)/usuario/RedefinirSenha';
import CustomDrawerContent from './CustomDrawerContent';

type ColorScheme = 'light' | 'dark';

const DrawerNavigator = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();
const Stack = createStackNavigator();

/* =======================
   TABS - Abas Principais
======================= */
function Tabs() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme];

  return (
    <TabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({ route }: { route: RouteProp<any, any> }) => ({
        tabBarActiveTintColor: theme.secondary,
        tabBarInactiveTintColor: '#c3d9ff',
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: 'rgba(255,255,255,0.08)',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <MaterialIcons name="home" size={size} color={color} />;
            case 'Buscar Voos':
              return <MaterialIcons name="flight-takeoff" size={size} color={color} />;
            case 'Sobre':
              return <MaterialIcons name="info" size={size} color={color} />;
            default:
              return <MaterialIcons name="home" size={size} color={color} />;
          }
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        headerBackground: () => (
          <LinearGradient
            colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']}
            style={styles.headerGradient}
            start={[0, 0]}
            end={[1, 0]}
          />
        ),
      })}
    >
      <TabNavigator.Screen name="Home" component={HomeScreen} />
      <TabNavigator.Screen name="Buscar Voos" component={SearchFlightsScreen} />
      <TabNavigator.Screen name="Sobre" component={AboutCompanyScreen} />
    </TabNavigator.Navigator>
  );
}

/* =======================
   DRAWER (CONTROLE OFF)
======================= */
export default function DrawerLayout() {
  const colorScheme = useColorScheme() as ColorScheme;
  const theme = Colors[colorScheme];

  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 CONTROLE DE USUÁRIO DESATIVADO
  useEffect(() => {
    setUserType('0'); // '0' = ADMIN | '1' = USUÁRIO
    setLoading(false);
  }, []);

  if (loading) return null;

  const getDrawerIcon = (routeName: string, color: string, size: number) => {
    switch (routeName) {
      case 'Home':
        return <MaterialIcons name="home" size={size} color={color} />;
      case 'GerenciamentoUser':
        return <Ionicons name="people" size={size} color={color} />;
      case 'GerenciamentoAgendamento':
      case 'GerenciamentoAgendamentoUser':
        return <MaterialIcons name="event" size={size} color={color} />;
      case 'GerenciamentoServico':
        return <MaterialIcons name="build" size={size} color={color} />;
      case 'Relatorio':
        return <MaterialIcons name="analytics" size={size} color={color} />;
      case 'AlterarSenha':
      case 'RedefinirSenha':
        return <MaterialIcons name="lock" size={size} color={color} />;
      case 'Buscar Voos':
      case 'CadastroAtendimento':
        return <MaterialIcons name="flight-takeoff" size={size} color={color} />;
      case 'Sobre':
        return <MaterialIcons name="info" size={size} color={color} />;
      default:
        return <MaterialIcons name="arrow-right" size={size} color={color} />;
    }
  };

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation, route }) => ({
        drawerStyle: {
          backgroundColor: theme.surface,
          width: 300,
        },
        drawerContentContainerStyle: {
          paddingTop: 0,
        },
        overlayColor: 'rgba(0, 0, 0, 0.35)',
        drawerActiveTintColor: theme.secondary,
        drawerInactiveTintColor: '#b8d6ff',
        drawerActiveBackgroundColor: 'rgba(0, 212, 255, 0.18)',
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
        },
        drawerItemStyle: {
          borderRadius: 14,
          marginHorizontal: 10,
          marginVertical: 4,
        },
        drawerIcon: ({ color, size }) => getDrawerIcon(route.name, color, size),
        headerLeft: () => (
          <Pressable onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15 }}>
            <MaterialIcons name="menu" size={28} color={theme.secondary} />
          </Pressable>
        ),
      })}
    >
      <DrawerNavigator.Screen
        name="Home"
        component={Tabs}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/AirTrip.png')}
                style={{ width: 40, height: 40, marginRight: 8, borderRadius: 20 }}
              />
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                AirTrip
              </Text>
            </View>
          ),
          headerBackground: () => (
            <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
          ),
        }}
      />

      {/* ================= ADMIN - Gerenciamento ================= */}
      {userType === '0' && (
        <>
          <DrawerNavigator.Screen 
            name="GerenciamentoUser" 
            component={GerenciamentoUser}
            options={{
              headerTitle: 'Gerenciar Usuários',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamento"
            component={GerenciamentoAgendamento}
            options={{
              headerTitle: 'Gerenciar Agendamentos',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="GerenciamentoServico"
            component={GerenciamentoServico}
            options={{
              headerTitle: 'Gerenciar Serviços',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
          <DrawerNavigator.Screen 
            name="Relatorio" 
            component={Relatorio}
            options={{
              headerTitle: 'Relatórios',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
          <DrawerNavigator.Screen 
            name="AlterarSenha" 
            component={AlterarSenhaScreen}
            options={{
              headerTitle: 'Alterar Senha',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
          <DrawerNavigator.Screen 
            name="RedefinirSenha" 
            component={RedefinirSenhaScreen}
            options={{
              headerTitle: 'Redefinir Senha',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
        </>
      )}

      {/* ================= USUÁRIO - Minhas Reservas ================= */}
      {userType === '1' && (
        <>
          <DrawerNavigator.Screen
            name="GerenciamentoAgendamentoUser"
            component={GerenciamentoAgendamentoUser}
            options={{
              headerTitle: 'Minhas Reservas',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
          <DrawerNavigator.Screen
            name="CadastroAtendimento"
            component={CadastroAtendimento}
            options={{
              headerTitle: 'Novo Atendimento',
              headerBackground: () => (
                <LinearGradient colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']} style={{ flex: 1 }} />
              ),
            }}
          />
        </>
      )}
    </DrawerNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    flex: 1,
  },
});