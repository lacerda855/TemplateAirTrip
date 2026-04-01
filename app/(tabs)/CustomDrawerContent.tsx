import React, { useEffect, useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  AppState,
  AppStateStatus,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDrawerStatus } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import API_URL from './../../conf/api';

interface UserData {
  email: string;
  userType: string;
  photo?: string;
  nome?: string;
}

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeEditado, setNomeEditado] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoVersion, setPhotoVersion] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());

  const isDrawerOpen = useDrawerStatus();
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Função para carregar dados do usuário com timestamp
  const loadUserData = async (forceUpdate: boolean = false) => {
    try {
      console.log('Carregando dados do usuário...', { forceUpdate, photoVersion });
      
      const [email, userType, photo, id, nomeCompleto, userDataString, lastSync] = await Promise.all([
        AsyncStorage.getItem('userEmail'),
        AsyncStorage.getItem('userType'),
        AsyncStorage.getItem('userPhoto'),
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('nome'),
        AsyncStorage.getItem('userData'),
        AsyncStorage.getItem('lastUserDataUpdate'),
      ]);

      // Verifica se precisa atualizar baseado no timestamp
      const lastUpdateTime = lastSync ? parseInt(lastSync) : 0;
      const currentTime = Date.now();
      const shouldUpdate = forceUpdate || (currentTime - lastUpdateTime > 5000); // 5 segundos

      console.log('Dados carregados do AsyncStorage:', {
        email, userType, photo, id, nomeCompleto, lastUpdateTime, currentTime, shouldUpdate
      });

      if (email && userType) {
        setUser({ 
          email, 
          userType, 
          photo: photo || undefined 
        });
      } else {
        setUser(null);
      }

      setUserId(id);
      const nomeValido = nomeCompleto?.trim();
      setNome(nomeValido && nomeValido !== '' ? nomeValido : null);

      // Se temos dados completos do usuário e precisa atualizar, use-os
      if (userDataString && shouldUpdate) {
        try {
          const userData = JSON.parse(userDataString);
          console.log('UserData parseado:', userData);
          
          if (userData.foto) {
            const photoUrl = userData.foto.includes('http') 
              ? userData.foto 
              : `${API_URL}${userData.foto}`;
            
            setUser(prev => prev ? { 
              ...prev, 
              photo: photoUrl,
              nome: userData.nome || prev.nome
            } : null);
            
            // Atualiza o timestamp da última sincronização
            await AsyncStorage.setItem('lastUserDataUpdate', currentTime.toString());
            setLastUpdate(currentTime);
          }
        } catch (parseError) {
          console.error('Erro ao fazer parse do userData:', parseError);
        }
      }
    } catch (e) {
      console.error('Erro ao carregar dados do usuário:', e);
    } finally {
      setLoading(false);
    }
  };

  // Listener para mudanças no AppState (quando o app volta para foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        console.log('App voltou ao foreground, atualizando dados...');
        loadUserData(true);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  // Atualiza sempre que o drawer abre
  useEffect(() => {
    if (isDrawerOpen === 'open') {
      console.log('Drawer aberto, atualizando dados...');
      loadUserData(true);
    }
  }, [isDrawerOpen]);

  // Atualização periódica a cada 30 segundos quando o drawer está aberto
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDrawerOpen === 'open') {
      interval = setInterval(() => {
        console.log('Atualização periódica do drawer...');
        loadUserData(true);
      }, 30000); // 30 segundos
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDrawerOpen]);

  // Efeito para a animação quando não há usuário
  useEffect(() => {
    if (!user) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [user]);

  // Função para forçar atualização completa
  const forcePhotoUpdate = async () => {
    console.log('Forçando atualização da foto...');
    setLoading(true);
    
    // Limpa o timestamp para forçar recarregamento
    await AsyncStorage.removeItem('lastUserDataUpdate');
    
    // Incrementa a versão da foto para forçar recarregamento da Image
    setPhotoVersion(prev => prev + 1);
    
    // Recarrega os dados
    await loadUserData(true);
  };

  // Função para obter a URL da foto com cache busting
  const getPhotoUrl = (photo: string) => {
    if (!photo) return null;
    
    const baseUrl = photo.includes('http') ? photo : `${API_URL}${photo}`;
    // Adiciona timestamp para evitar cache
    return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}v=${photoVersion}&t=${lastUpdate}`;
  };

  // Função para formatar o tipo de usuário
  const getTipoUsuarioFormatado = (userType: string) => {
    switch (userType) {
      case '0':
        return 'Administrador';
      case '1':
        return 'Cliente';
      default:
        return 'Usuário';
    }
  };

  // Função para obter o ícone do tipo de usuário
  const getIconeUsuario = (userType: string) => {
    switch (userType) {
      case '0':
        return <FontAwesome5 name="user-shield" size={16} color="#2E8B57" />;
      case '1':
        return <FontAwesome5 name="user" size={16} color="#4169E1" />;
      default:
        return <FontAwesome5 name="user" size={16} color="#666" />;
    }
  };

  const handleSalvarEdicao = async () => {
    if (!nomeEditado.trim()) {
      return;
    }
    
    try {
      await AsyncStorage.setItem('nome', nomeEditado);
      setNome(nomeEditado);
      setModalVisible(false);
      setNomeEditado('');
      
      // Atualiza também no objeto user e força atualização
      setUser(prev => prev ? { ...prev, nome: nomeEditado } : null);
      forcePhotoUpdate();
    } catch (e) {
      console.error('Erro ao salvar nome:', e);
    }
  };

  // Componente do botão de atualização
  const RefreshButton = () => (
    <TouchableOpacity
      style={[styles.refreshButton, loading && styles.refreshButtonDisabled]}
      onPress={forcePhotoUpdate}
      disabled={loading}
      accessibilityLabel="Atualizar dados"
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <MaterialIcons name="refresh" size={18} color="#FFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header com gradiente */}
      <LinearGradient
        colors={['#A67B5B', '#8B5A2B', '#5C4033']}
        style={styles.header}
        start={[0, 0]}
        end={[1, 1]}
      >
        {user && (
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setModalVisible(true)}
              accessibilityLabel="Editar nome"
            >
              <MaterialIcons name="edit" size={20} color="#FFF" />
            </TouchableOpacity>
            <RefreshButton />
          </View>
        )}

        {user ? (
          <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="#FFF"
                  style={styles.loader}
                />
              )}
              <Image
                source={
                  user.photo
                    ? { 
                        uri: getPhotoUrl(user.photo),
                        cache: 'reload' // Força recarregamento
                      }
                    : require('../../assets/images/user-placeholder.png')
                }
                style={[styles.avatar, loading && { opacity: 0.3 }]}
                resizeMode="cover"
                onLoadStart={() => !loading && setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', e.nativeEvent.error);
                  setLoading(false);
                }}
                key={`photo-${photoVersion}-${lastUpdate}`} // Key única para forçar recriação
              />
              <View style={styles.userStatus}>
                {getIconeUsuario(user.userType)}
              </View>
            </View>
            
            <Text style={styles.name}>
              {nome || user.nome || 'Nome não disponível'}
            </Text>
            
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <MaterialIcons name="email" size={14} color="#FFF" />
                <Text style={styles.infoText}>E-mail: {user.email}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <MaterialIcons name="person" size={14} color="#FFF" />
                <Text style={styles.infoText}>
                  Tipo: {getTipoUsuarioFormatado(user.userType)}
                </Text>
              </View>
              
              {/* Indicador de última atualização (opcional, para debug) */}
              <View style={styles.infoRow}>
                <MaterialIcons name="access-time" size={12} color="#FFF" />
                <Text style={[styles.infoText, styles.updateText]}>
                  Atualizado: {new Date(lastUpdate).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <Animated.View style={[styles.loggedOutContainer, { opacity: fadeAnim }]}>
            <MaterialIcons name="warning" size={24} color="#FFF" />
            <Text style={styles.loggedOutText}>Usuário não logado</Text>
            <Text style={styles.loggedOutSubText}>
              Faça login para acessar todas as funcionalidades
            </Text>
          </Animated.View>
        )}
      </LinearGradient>

      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Modal para editar nome */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
          setNomeEditado('');
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Nome</Text>
            <TextInput
              value={nomeEditado}
              onChangeText={setNomeEditado}
              placeholder="Digite seu nome"
              placeholderTextColor="#999"
              style={styles.input}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setNomeEditado('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSalvarEdicao}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 25,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#8B5A2B',
    minHeight: 200,
    justifyContent: 'center',
  },
  headerButtons: {
    position: 'absolute',
    top: 15,
    right: 15,
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 6,
  },
  refreshButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 6,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshButtonDisabled: {
    opacity: 0.6,
  },
  userInfoContainer: {
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  userStatus: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: 8,
    opacity: 0.9,
  },
  updateText: {
    fontSize: 12,
    opacity: 0.7,
  },
  loggedOutContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loggedOutText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  loggedOutSubText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -10,
    marginTop: -10,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#5C4033',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  saveButton: {
    backgroundColor: '#5C4033',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});

export default CustomDrawerContent;