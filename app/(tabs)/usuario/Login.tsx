import React, { useState, useEffect } from 'react';
import { View, Image, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles/LoginScreenStyles';
import { useAuth } from './hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateLoginFields } from './util/utils';

type RootStackParamList = {
  Home: undefined;
  RegistroUser: undefined;
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { loading, visibleSnackbar, setVisibleSnackbar, handleLogin } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userType = await AsyncStorage.getItem('userType');
        if (userType) {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      }
    };
    checkUser();
  }, []);

  const handleLoginPress = () => {
    const validationMessage = validateLoginFields(email, senha);
    if (validationMessage !== true) {
      Alert.alert('Erro', validationMessage as string);
      return;
    }

    handleLogin(email, senha, navigation);
  };

  return (
    <LinearGradient
      colors={['#8B4513', '#D2B48C', '#FFF8E1']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.imageWrapper}>
            <Image source={require('../../../assets/images/AirTrip.png')} style={styles.image} />
          </View>
          <Text style={styles.brand}>AirTrip</Text>
        </View>

        <Text style={styles.title}>Login</Text>

        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          left={<TextInput.Icon icon="email" />}
          outlineColor="#A67B5B"
          activeOutlineColor="#5D4037"
        />

        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          left={<TextInput.Icon icon="lock" />}
          outlineColor="#A67B5B"
          activeOutlineColor="#5D4037"
        />

        <Button
          mode="contained"
          onPress={handleLoginPress}
          style={styles.button}
          contentStyle={{ paddingVertical: 8 }}
          loading={loading}
          disabled={loading}
        >
          Entrar
        </Button>

        <Text
          style={styles.link}
          onPress={() => navigation.navigate('RegistroUser')}
        >
          Criar uma conta
        </Text>

        <Snackbar
          visible={visibleSnackbar}
          onDismiss={() => setVisibleSnackbar(false)}
          duration={Snackbar.DURATION_SHORT}
        >
          Login bem-sucedido!
        </Snackbar>
      </ScrollView>
    </LinearGradient>
  );
}
