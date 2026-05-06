import React from 'react';
import {
  SafeAreaView,
  Image,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import {
  PaperProvider,
  TextInput,
  Modal,
  Portal,
  IconButton,
  Button,
  Text,
  Card,
  Avatar
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles/GerenciamentoUserStyles';
import useUserManagement from './hooks/useUserManagement';
import { LinearGradient } from 'expo-linear-gradient';
import API_URL from '../../../conf/api'; // Adicione esta importação
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
const GerenciamentoUser = () => {
  const {
    visible,
    users,
    filteredUsers,
    newUser,
    currentUser,
    searchQuery,
    userPhoto,
    setNewUser,
    setSearchQuery,
    showModal,
    hideModal,
    addUser,
    updateUser,
    deleteUser,
    setCurrentUser,
    pickUserImage,
    setUserPhoto
  } = useUserManagement();

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme];
  const adminCount = users.filter(user => user.tipoUsuario === 0).length;
  const clientCount = users.filter(user => user.tipoUsuario === 1).length;

  const getUserTypeText = (tipo: number) => {
    return tipo === 0 ? 'Administrador' : 'Cliente';
  };

  const getUserTypeColor = (tipo: number) => {
    return tipo === 0 ? theme.accent : theme.secondary;
  };

  return (
    <LinearGradient
      colors={[theme.primary, theme.surfaceLighter, theme.secondary]}
      style={styles.gradientBackground}
    >
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.screenHeader}>
            <Text style={styles.screenTitle}>Gerenciamento de Usuários</Text>
            <Text style={styles.screenSubtitle}>
              Controle de acessos, perfil e privilégios com um visual moderno e alinhado à marca.
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{filteredUsers.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{adminCount}</Text>
                <Text style={styles.statLabel}>Administradores</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{clientCount}</Text>
                <Text style={styles.statLabel}>Clientes</Text>
              </View>
            </View>
          </View>

          <Image
            source={require('../../../assets/images/AirTrip.png')}
            style={styles.image}
          />

          <Button
            icon="plus"
            mode="contained"
            onPress={() => showModal('addUser')}
            textColor="white"
            buttonColor={theme.secondary}
            contentStyle={styles.addButtonContent}
            labelStyle={styles.addButtonLabel}
            style={styles.addButton}
          >
            Adicionar Usuário
          </Button>

          <TextInput
            label="Pesquisar"
            mode="outlined"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={styles.searchInput}
            outlineColor={theme.accent}
            activeOutlineColor={theme.secondary}
            left={<TextInput.Icon icon="magnify" color={theme.secondary} />}
          />

          <View style={styles.titleContainer}>
            <Text style={styles.tableTitle}>Lista de Usuários</Text>
          </View>

          {/* Cards de Usuários Melhorados */}
          <ScrollView
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <Card
                  key={user.id}
                  style={[
                    styles.card,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.surfaceLighter,
                    },
                    index % 2 === 0 ? styles.cardEven : styles.cardOdd,
                  ]}
                >
                  <Card.Content style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Avatar.Text
                        size={50}
                        label={user.nome.charAt(0).toUpperCase()}
                        style={[styles.avatar, { backgroundColor: getUserTypeColor(user.tipoUsuario) }]}
                        labelStyle={styles.avatarLabel}
                      />
                      <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user.nome}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                        <View style={[styles.userTypeBadge, { backgroundColor: getUserTypeColor(user.tipoUsuario) }]}>
                          <Text style={styles.userTypeText}>
                            {getUserTypeText(user.tipoUsuario)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.cardDetails}>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Senha:</Text>
                        <Text style={styles.detailValue}>••••••••</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>ID:</Text>
                        <Text style={styles.detailValue}>{user.id}</Text>
                      </View>
                    </View>
                  </Card.Content>

                  <Card.Actions style={styles.cardActions}>
                    <Button
                      mode="contained"
                      icon="pencil"
                      onPress={() => {
                        setCurrentUser(user);
                        showModal('editUser');
                      }}
                      style={[styles.editButton, { backgroundColor: theme.secondary }]}
                      labelStyle={styles.buttonLabel}
                      contentStyle={styles.buttonContent}
                    >
                      Editar
                    </Button>
                    <Button
                      mode="outlined"
                      icon="delete"
                      onPress={() => {
                        setCurrentUser(user);
                        showModal('deleteUser');
                      }}
                      style={styles.deleteButton}
                      labelStyle={styles.deleteButtonLabel}
                      contentStyle={styles.buttonContent}
                    >
                      Excluir
                    </Button>
                  </Card.Actions>
                </Card>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Nenhum usuário encontrado</Text>
                <Text style={styles.emptyStateSubtext}>
                  {searchQuery ? 'Tente ajustar os termos da pesquisa' : 'Adicione um novo usuário para começar'}
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.counterText}>Total de usuários: {filteredUsers.length}</Text>
          </View>

          {/* Modal: Adicionar Usuário */}
          <Portal>
            <Modal
              visible={visible.addUser}
              onDismiss={() => hideModal('addUser')}
              contentContainerStyle={styles.modalOverlay}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
              >
                <ScrollView
                  contentContainerStyle={styles.modalScrollContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Adicionar Usuário</Text>
                    </View>

                    <View style={styles.modalContent}>
                      <View style={styles.inputGrid}>
                        <TextInput
                          label="Nome"
                          mode="outlined"
                          value={newUser.nome}
                          onChangeText={text => setNewUser(prev => ({ ...prev, nome: text }))}
                          style={styles.inputField}
                          outlineColor={theme.accent}
                          activeOutlineColor={theme.secondary}
                          left={<TextInput.Icon icon="account" color={theme.secondary} />}
                        />
                        <TextInput
                          label="Email"
                          mode="outlined"
                          value={newUser.email}
                          onChangeText={text => setNewUser(prev => ({ ...prev, email: text }))}
                          style={styles.inputField}
                          outlineColor={theme.accent}
                          activeOutlineColor={theme.secondary}
                          left={<TextInput.Icon icon="email" color={theme.secondary} />}
                        />
                        <TextInput
                          label="Senha"
                          mode="outlined"
                          secureTextEntry
                          value={newUser.senha}
                          onChangeText={text => setNewUser(prev => ({ ...prev, senha: text }))}
                          style={styles.inputField}
                          outlineColor={theme.accent}
                          activeOutlineColor={theme.secondary}
                          left={<TextInput.Icon icon="lock" color={theme.secondary} />}
                        />

                        <View style={styles.pickerContainer}>
                          <Text style={styles.pickerLabel}>Tipo de Usuário</Text>
                          <View style={[styles.pickerWrapper, { borderColor: theme.accent }]}> 
                            <Picker
                              selectedValue={newUser.tipoUsuario}
                              onValueChange={itemValue => setNewUser(prev => ({ ...prev, tipoUsuario: itemValue }))}
                              style={styles.picker}
                              dropdownIconColor={theme.secondary}
                            >
                              <Picker.Item label="Administrador" value={0} />
                              <Picker.Item label="Cliente" value={1} />
                            </Picker>
                          </View>
                        </View>
                      </View>

                      <View style={styles.photoSection}>
                        <Text style={styles.photoLabel}>
                          Clique na imagem para mudar a foto de perfil
                        </Text>
                        <View style={styles.imageContainer}>
                          <TouchableOpacity onPress={pickUserImage} style={styles.imageTouchable}>
                            {userPhoto ? (
                              <Image source={{ uri: userPhoto }} style={styles.profileImage} />
                            ) : (
                              <View style={styles.placeholder}>
                                <Image
                                  source={require('../../../assets/images/user-placeholder.png')}
                                  style={styles.placeholderImage}
                                />
                              </View>
                            )}
                          </TouchableOpacity>
                          {userPhoto && (
                            <Button
                              mode="outlined"
                              onPress={() => setUserPhoto(null)}
                              style={[styles.removePhotoButton, { borderColor: theme.secondary }]}
                              textColor={theme.secondary}
                              icon="close"
                            >
                              Remover Foto
                            </Button>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.modalFooter}>
                      <Button
                        mode="contained"
                        onPress={addUser}
                        style={[styles.modalActionButton, { backgroundColor: theme.secondary }]}
                        contentStyle={styles.modalButtonContent}
                        labelStyle={styles.modalButtonLabel}
                      >
                        Adicionar Usuário
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Modal>
          </Portal>

          {/* Modal: Editar Usuário */}
          <Portal>
            <Modal
              visible={visible.editUser}
              onDismiss={() => {
                setUserPhoto(null);
                hideModal('editUser');
              }}
              contentContainerStyle={styles.modalOverlay}
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
              >
                <ScrollView
                  contentContainerStyle={styles.modalScrollContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.modalContainer}>
<View style={[styles.modalHeader, { backgroundColor: theme.secondary }]}> 
                      <Text style={styles.modalTitle}>Editar Usuário</Text>
                    </View>

                    <View style={styles.modalContent}>
                      <View style={styles.inputGrid}>
                        <TextInput
                          label="Nome"
                          mode="outlined"
                          value={currentUser?.nome || ''}
                          onChangeText={text => setCurrentUser(prev => prev ? { ...prev, nome: text } : null)}
                          style={styles.inputField}
                          outlineColor={theme.accent}
                          activeOutlineColor={theme.secondary}
                        />
                        <TextInput
                          label="Email"
                          mode="outlined"
                          value={currentUser?.email || ''}
                          onChangeText={text => setCurrentUser(prev => prev ? { ...prev, email: text } : null)}
                          style={styles.inputField}
                          outlineColor={theme.accent}
                          activeOutlineColor={theme.secondary}
                        />
                        <TextInput
                          label="Senha"
                          mode="outlined"
                          secureTextEntry
                          value={currentUser?.senha || ''}
                          onChangeText={text => setCurrentUser(prev => prev ? { ...prev, senha: text } : null)}
                          style={styles.inputField}
                          outlineColor={theme.accent}
                          activeOutlineColor={theme.secondary}
                        />

                        <View style={styles.pickerContainer}>
                          <Text style={styles.pickerLabel}>Tipo de Usuário</Text>
                          <View style={styles.pickerWrapper}>
                            <Picker
                              selectedValue={currentUser?.tipoUsuario || 0}
                              onValueChange={itemValue => setCurrentUser(prev => prev ? { ...prev, tipoUsuario: itemValue } : {
                                id: '',
                                nome: '',
                                senha: '',
                                email: '',
                                tipoUsuario: itemValue
                              })}
                              style={styles.picker}
                              dropdownIconColor={theme.secondary}
                            >
                              <Picker.Item label="Administrador" value={0} />
                              <Picker.Item label="Cliente" value={1} />
                            </Picker>
                          </View>
                        </View>
                      </View>

                      {/* Seção de Foto no Modal de Edição */}
                      <View style={styles.photoSection}>
                        <Text style={styles.photoLabel}>
                          Clique na imagem para mudar a foto de perfil
                        </Text>
                        <View style={styles.imageContainer}>
                          <TouchableOpacity onPress={pickUserImage} style={styles.imageTouchable}>
                            {userPhoto ? (
                              <Image source={{ uri: userPhoto }} style={styles.profileImage} />
                            ) : currentUser?.foto ? (
                              <Image
                                source={{ uri: `${API_URL}${currentUser.foto}` }}
                                style={styles.profileImage}
                              />
                            ) : (
                              <View style={styles.placeholder}>
                                <Image
                                  source={require('../../../assets/images/user-placeholder.png')}
                                  style={styles.placeholderImage}
                                />
                              </View>
                            )}
                          </TouchableOpacity>
                          {(userPhoto || currentUser?.foto) && (
                            <Button
                              mode="outlined"
                              onPress={() => {
                                setUserPhoto(null);
                                // Se quiser remover a foto do usuário completamente, você precisaria de uma lógica adicional
                              }}
                              style={styles.removePhotoButton}
                              textColor="#8B4513"
                              icon="close"
                            >
                              {userPhoto ? 'Remover Nova Foto' : 'Remover Foto Atual'}
                            </Button>
                          )}
                        </View>
                      </View>
                    </View>

                    <View style={styles.modalFooter}>
                      <Button
                        mode="contained"
                        onPress={updateUser}
                        style={[styles.modalActionButton, { backgroundColor: theme.secondary }]}
                        contentStyle={styles.modalButtonContent}
                        labelStyle={styles.modalButtonLabel}
                      >
                        Atualizar Usuário
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Modal>
          </Portal>
          {/* Modal: Deletar Usuário */}
          <Portal>
            <Modal
              visible={visible.deleteUser}
              onDismiss={() => hideModal('deleteUser')}
              contentContainerStyle={styles.modalOverlay}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
                </View>

                <View style={styles.modalContent}>
                  <View style={styles.deleteConfirmation}>
                    <Text style={styles.deleteText}>
                      Deseja realmente excluir o usuário {' '}
                      <Text style={styles.deleteUserName}>{currentUser?.nome}</Text>?
                    </Text>
                    <Text style={styles.deleteSubtext}>
                      Esta ação não pode ser desfeita.
                    </Text>
                  </View>
                </View>

                <View style={styles.modalFooter}>
                  <Button
                    mode="outlined"
                    onPress={() => hideModal('deleteUser')}
                    style={styles.cancelButton}
                    contentStyle={styles.modalButtonContent}
                    labelStyle={styles.cancelButtonLabel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    mode="contained"
                    onPress={deleteUser}
                    style={styles.confirmDeleteButton}
                    contentStyle={styles.modalButtonContent}
                    labelStyle={styles.modalButtonLabel}
                  >
                    Excluir
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>
        </SafeAreaView>
      </PaperProvider>
    </LinearGradient>

  );
};

export default GerenciamentoUser;