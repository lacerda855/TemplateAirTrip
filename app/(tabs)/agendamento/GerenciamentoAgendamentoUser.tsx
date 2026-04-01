import React from 'react';
import { 
  SafeAreaView, 
  Image, 
  View, 
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { 
  Provider as PaperProvider, 
  Modal, 
  Portal, 
  IconButton, 
  Button, 
  Text, 
  Card,
  Avatar,
  TextInput
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from './styles/GerenciamentoAgendamentoUserStyles';
import { useGerenciamentoAgendamentoUser } from './hooks/useGerenciamentoAgendamentoUser';
import { RootStackParamList } from './hooks/AgendamentoTypes';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const GerenciamentoAgendamentoUser = () => {
  const navigation = useNavigation<NavigationProp>();
  
  const {
    visible,
    currentAgendamento,
    agendamentos,
    newAgendamento,
    showDatePicker,
    servicos,
    selectedServico,
    selectedDataAtendimento,
    showDatePickerEditar,
    selectedHorarioEditar,
    searchQuery,
    horarios,
    setShowDatePicker,
    setSelectedServico,
    setNewAgendamento,
    setSelectedDataAtendimento,
    setShowDatePickerEditar,
    setSelectedHorarioEditar,
    setSearchQuery,
    setCurrentAgendamento,
    addAgendamento,
    validateAndUpdateAgendamento,
    deleteAgendamento,
    showModal,
    hideModal,
    onChangeDate,
  } = useGerenciamentoAgendamentoUser();

  const formatDate = (dateString: string) => {
    if (!dateString) return '--/--/----';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return '--/--/---- --:--';
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR');
  };

  const getServiceIcon = (serviceType: string) => {
    const icons: { [key: string]: string } = {
      'Tratamentos Faciais': 'face-woman',
      'Tratamentos Corporais': 'human',
      'Tratamentos Capilares': 'content-cut',
      'Podologia': 'foot-print',
      'Bem-estar e Terapias Alternativas': 'meditation'
    };
    return icons[serviceType] || 'spa';
  };

  const getStatusColor = (dataAtendimento: string, horario: string) => {
    const now = new Date();
    const [day, month, year] = dataAtendimento.split('/');
    const [hours] = horario.split(':');
    const agendamentoDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours));
    
    if (agendamentoDate < now) return '#95a5a6'; // Concluído - cinza
    if (agendamentoDate.toDateString() === now.toDateString()) return '#e74c3c'; // Hoje - vermelho
    if ((agendamentoDate.getTime() - now.getTime()) < 24 * 60 * 60 * 1000) return '#f39c12'; // Amanhã - laranja
    return '#27ae60'; // Futuro - verde
  };

  const getStatusText = (dataAtendimento: string, horario: string) => {
    const now = new Date();
    const [day, month, year] = dataAtendimento.split('/');
    const [hours] = horario.split(':');
    const agendamentoDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours));
    
    if (agendamentoDate < now) return 'Concluído';
    if (agendamentoDate.toDateString() === now.toDateString()) return 'Hoje';
    if ((agendamentoDate.getTime() - now.getTime()) < 24 * 60 * 60 * 1000) return 'Amanhã';
    return 'Agendado';
  };

  return (
    <LinearGradient colors={['#f7e7ce', '#D2B48C', '#A67B5B']} style={styles.gradientBackground}>
      <PaperProvider>
        <SafeAreaView style={styles.container}>

          <Image 
            source={require('../../../assets/images/AirTrip.png')} 
            style={styles.image} 
          />

          <Button
            icon="plus"
            mode="contained"
            onPress={() => showModal('addAgendamento')}
            textColor="white"
            buttonColor="#A67B5B"
            contentStyle={styles.addButtonContent}
            labelStyle={styles.addButtonLabel}
            style={styles.addButton}
          >
            Novo Agendamento
          </Button>

          <TextInput
            label="Pesquisar agendamentos..."
            mode="outlined"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={styles.searchInput}
            outlineColor="#A67B5B"
            activeOutlineColor="#8B4513"
            left={<TextInput.Icon icon="magnify" color="#A67B5B" />}
          />

          <View style={styles.titleContainer}>
            <Text style={styles.tableTitle}>Meus Agendamentos</Text>
            <Text style={styles.tableSubtitle}>
              {agendamentos.length} agendamento{agendamentos.length !== 1 ? 's' : ''} encontrado{agendamentos.length !== 1 ? 's' : ''}
            </Text>
          </View>

          {/* Cards de Agendamentos */}
          <ScrollView 
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          >
            {agendamentos.length > 0 ? (
              agendamentos.map((agendamento, index) => (
                <Card key={agendamento.id} style={[
                  styles.card,
                  index % 2 === 0 ? styles.cardEven : styles.cardOdd
                ]}>
                  <Card.Content style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Avatar.Icon 
                        size={60} 
                        icon={getServiceIcon(agendamento.tipoServico || '')} 
                        style={[styles.serviceAvatar, { backgroundColor: '#A67B5B' }]}
                        color="white"
                      />
                      <View style={styles.agendamentoInfo}>
                        <Text style={styles.serviceName}>{agendamento.tipoServico}</Text>
                        <Text style={styles.userName}>Agendado para {agendamento.usuarioNome}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agendamento.dataAtendimento, agendamento.horario) }]}>
                          <Text style={styles.statusText}>
                            {getStatusText(agendamento.dataAtendimento, agendamento.horario)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <View style={styles.cardDetails}>
                      <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>📅 Data</Text>
                          <Text style={styles.detailValue}>
                            {formatDate(agendamento.dataAtendimento)}
                          </Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>🕒 Horário</Text>
                          <Text style={styles.detailValue}>{agendamento.horario}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>👤 Cliente</Text>
                          <Text style={styles.detailValue}>{agendamento.usuarioNome}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>💼 Serviço</Text>
                          <Text style={styles.detailValue} numberOfLines={1}>
                            {agendamento.tipoServico}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>💰 Valor</Text>
                          <Text style={styles.detailValue}>
                            {agendamento.valor ? `R$ ${parseFloat(agendamento.valor.toString()).toFixed(2)}` : '--'}
                          </Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Text style={styles.detailLabel}>📋 Agendado em</Text>
                          <Text style={styles.detailValue}>
                            {formatDateTime(agendamento.dthoraAgendamento)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card.Content>
                  
                  <Card.Actions style={styles.cardActions}>
                    <Button
                      mode="contained"
                      icon="pencil"
                      onPress={() => {
                        setCurrentAgendamento(agendamento);
                        showModal('editAgendamento');
                      }}
                      style={styles.editButton}
                      labelStyle={styles.buttonLabel}
                      contentStyle={styles.buttonContent}
                    >
                      Editar
                    </Button>
                    <Button
                      mode="outlined"
                      icon="delete"
                      onPress={() => {
                        setCurrentAgendamento(agendamento);
                        showModal('deleteAgendamento');
                      }}
                      style={styles.deleteButton}
                      labelStyle={styles.deleteButtonLabel}
                      contentStyle={styles.buttonContent}
                    >
                      Cancelar
                    </Button>
                  </Card.Actions>
                </Card>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Nenhum agendamento encontrado</Text>
                <Text style={styles.emptyStateSubtext}>
                  {searchQuery ? 'Tente ajustar os termos da pesquisa' : 'Crie um novo agendamento para começar'}
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Modal Adicionar Agendamento */}
          <Portal>
            <Modal 
              visible={visible.addAgendamento} 
              onDismiss={() => hideModal('addAgendamento')} 
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
                      <Text style={styles.modalTitle}>Novo Agendamento</Text>
                    </View>
                    
                    <View style={styles.modalContent}>
                      <View style={styles.inputSection}>
                        <Text style={styles.sectionLabel}>📅 Data do Atendimento</Text>
                        <TouchableOpacity 
                          style={styles.dateButton}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <View style={styles.dateButtonContent}>
                            <Text style={[
                              styles.dateButtonText,
                              !newAgendamento.dataAtendimento && styles.dateButtonPlaceholder
                            ]}>
                              {newAgendamento.dataAtendimento || 'Selecione a data'}
                            </Text>
                            <IconButton
                              icon="calendar"
                              size={20}
                              iconColor="#A67B5B"
                            />
                          </View>
                        </TouchableOpacity>
                        
                        {showDatePicker && (
                          <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, date) => onChangeDate(event, date, false)}
                          />
                        )}
                      </View>

                      <View style={styles.inputSection}>
                        <Text style={styles.sectionLabel}>🕒 Horário</Text>
                        <View style={styles.pickerWrapper}>
                          <Picker
                            selectedValue={newAgendamento.horario}
                            onValueChange={(itemValue) =>
                              setNewAgendamento((prev) => ({ ...prev, horario: itemValue }))
                            }
                            style={styles.picker}
                            dropdownIconColor="#A67B5B"
                          >
                            <Picker.Item label="Selecione um horário" value="" />
                            {horarios.map((horario, index) => (
                              <Picker.Item 
                                key={index} 
                                label={horario} 
                                value={horario} 
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>

                      <View style={styles.inputSection}>
                        <Text style={styles.sectionLabel}>💆 Serviço</Text>
                        <View style={styles.pickerWrapper}>
                          <Picker
                            selectedValue={selectedServico}
                            onValueChange={(itemValue) => {
                              setSelectedServico(itemValue);
                              setNewAgendamento((prev) => ({
                                ...prev,
                                fk_servico_id: Number(itemValue),
                              }));
                            }}
                            style={styles.picker}
                            dropdownIconColor="#A67B5B"
                          >
                            <Picker.Item label="Selecione um serviço" value="" />
                            {servicos.map((servico) => (
                              <Picker.Item
                                key={servico.id}
                                label={`${servico.tiposervico} - R$ ${parseFloat(servico.valor.toString()).toFixed(2)}`}
                                value={servico.id}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>

                      {/* Preview do Agendamento */}
                      {(newAgendamento.dataAtendimento || newAgendamento.horario || selectedServico) && (
                        <View style={styles.agendamentoPreview}>
                          <Text style={styles.previewTitle}>Pré-visualização do Agendamento</Text>
                          <View style={styles.previewCard}>
                            <View style={styles.previewHeader}>
                              <Avatar.Icon 
                                size={40} 
                                icon={getServiceIcon(servicos.find(s => s.id === newAgendamento.fk_servico_id)?.tiposervico || '')} 
                                style={styles.previewAvatar}
                                color="white"
                              />
                              <View>
                                <Text style={styles.previewServiceName}>
                                  {servicos.find(s => s.id === newAgendamento.fk_servico_id)?.tiposervico || 'Serviço'}
                                </Text>
                                <Text style={styles.previewDetails}>
                                  {newAgendamento.dataAtendimento} • {newAgendamento.horario}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>

                    <View style={styles.modalFooter}>
                      <Button 
                        mode="contained" 
                        onPress={addAgendamento} 
                        style={styles.modalActionButton}
                        contentStyle={styles.modalButtonContent}
                        labelStyle={styles.modalButtonLabel}
                        disabled={!newAgendamento.dataAtendimento || !newAgendamento.horario || !newAgendamento.fk_servico_id}
                      >
                        Confirmar Agendamento
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Modal>
          </Portal>
          
          {/* Modal Editar Agendamento */}
          <Portal>
            <Modal 
              visible={visible.editAgendamento} 
              onDismiss={() => hideModal('editAgendamento')} 
              contentContainerStyle={styles.modalOverlay}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Editar Agendamento</Text>
                </View>
                
                <View style={styles.modalContent}>
                  {currentAgendamento && (
                    <View style={styles.currentAgendamentoInfo}>
                      <Text style={styles.currentInfoTitle}>Agendamento Atual</Text>
                      <View style={styles.currentInfoGrid}>
                        <View style={styles.currentInfoItem}>
                          <Text style={styles.currentInfoLabel}>Cliente</Text>
                          <Text style={styles.currentInfoValue}>{currentAgendamento.usuarioNome}</Text>
                        </View>
                        <View style={styles.currentInfoItem}>
                          <Text style={styles.currentInfoLabel}>Serviço</Text>
                          <Text style={styles.currentInfoValue}>{currentAgendamento.tipoServico}</Text>
                        </View>
                        <View style={styles.currentInfoItem}>
                          <Text style={styles.currentInfoLabel}>Data</Text>
                          <Text style={styles.currentInfoValue}>{currentAgendamento.dataAtendimento}</Text>
                        </View>
                        <View style={styles.currentInfoItem}>
                          <Text style={styles.currentInfoLabel}>Horário</Text>
                          <Text style={styles.currentInfoValue}>{currentAgendamento.horario}</Text>
                        </View>
                      </View>
                    </View>
                  )}

                  <View style={styles.inputSection}>
                    <Text style={styles.sectionLabel}>📅 Nova Data do Atendimento</Text>
                    <TouchableOpacity 
                      style={styles.dateButton}
                      onPress={() => setShowDatePickerEditar(true)}
                    >
                      <View style={styles.dateButtonContent}>
                        <Text style={styles.dateButtonText}>
                          {selectedDataAtendimento || 'Selecione a nova data'}
                        </Text>
                        <IconButton
                          icon="calendar"
                          size={20}
                          iconColor="#A67B5B"
                        />
                      </View>
                    </TouchableOpacity>
                    
                    {showDatePickerEditar && (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                          if (date) {
                            const formattedDate = date.toISOString().split('T')[0];
                            setSelectedDataAtendimento(formattedDate);
                            setCurrentAgendamento(prev =>
                              prev ? { ...prev, dataAtendimento: formattedDate } : prev
                            );
                          }
                          setShowDatePickerEditar(false);
                        }}
                      />
                    )}
                  </View>

                  <View style={styles.inputSection}>
                    <Text style={styles.sectionLabel}>🕒 Novo Horário</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={selectedHorarioEditar}
                        onValueChange={(itemValue) => {
                          setSelectedHorarioEditar(itemValue);
                          setCurrentAgendamento(prev =>
                            prev ? { ...prev, horario: itemValue } : null
                          );
                        }}
                        style={styles.picker}
                        dropdownIconColor="#A67B5B"
                      >
                        <Picker.Item label="Selecione um horário" value="" />
                        {horarios.map((horario, index) => (
                          <Picker.Item key={index} label={horario} value={horario} />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <View style={styles.inputSection}>
                    <Text style={styles.sectionLabel}>💆 Novo Serviço</Text>
                    <View style={styles.pickerWrapper}>
                      <Picker
                        selectedValue={selectedServico}
                        onValueChange={(itemValue) => {
                          setSelectedServico(itemValue);
                          setCurrentAgendamento(prev =>
                            prev ? { ...prev, fk_servico_id: Number(itemValue) } : null
                          );
                        }}
                        style={styles.picker}
                        dropdownIconColor="#A67B5B"
                      >
                        <Picker.Item label="Selecione um serviço" value="" />
                        {servicos.map((servico) => (
                          <Picker.Item
                            key={servico.id}
                            label={`${servico.tiposervico} - R$ ${parseFloat(servico.valor.toString()).toFixed(2)}`}
                            value={String(servico.id)}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                
                <View style={styles.modalFooter}>
                  <Button 
                    mode="contained" 
                    onPress={validateAndUpdateAgendamento} 
                    style={styles.modalActionButton}
                    contentStyle={styles.modalButtonContent}
                    labelStyle={styles.modalButtonLabel}
                  >
                    Atualizar Agendamento
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>

          {/* Modal Deletar Agendamento */}
          <Portal>
            <Modal 
              visible={visible.deleteAgendamento} 
              onDismiss={() => hideModal('deleteAgendamento')} 
              contentContainerStyle={styles.modalOverlay}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Cancelar Agendamento</Text>
                </View>
                
                <View style={styles.modalContent}>
                  <View style={styles.deleteConfirmation}>
                    {currentAgendamento && (
                      <View style={styles.deleteAgendamentoInfo}>
                        <Avatar.Icon 
                          size={60} 
                          icon={getServiceIcon(currentAgendamento.tipoServico || '')} 
                          style={styles.deleteAvatar}
                          color="white"
                        />
                        <View>
                          <Text style={styles.deleteServiceName}>{currentAgendamento.tipoServico}</Text>
                          <Text style={styles.deleteClientName}>{currentAgendamento.usuarioNome}</Text>
                          <Text style={styles.deleteDateTime}>
                            {currentAgendamento.dataAtendimento} • {currentAgendamento.horario}
                          </Text>
                        </View>
                      </View>
                    )}
                    
                    <Text style={styles.deleteText}>
                      Deseja realmente cancelar este agendamento?
                    </Text>
                    <Text style={styles.deleteSubtext}>
                      Esta ação não pode ser desfeita.
                    </Text>
                  </View>
                </View>
                
                <View style={styles.modalFooter}>
                  <Button 
                    mode="outlined" 
                    onPress={() => hideModal('deleteAgendamento')} 
                    style={styles.cancelButton}
                    contentStyle={styles.modalButtonContent}
                    labelStyle={styles.cancelButtonLabel}
                  >
                    Manter Agendamento
                  </Button>
                  <Button 
                    mode="contained" 
                    onPress={deleteAgendamento}
                    style={styles.confirmDeleteButton}
                    contentStyle={styles.modalButtonContent}
                    labelStyle={styles.modalButtonLabel}
                  >
                    Cancelar Agendamento
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

export default GerenciamentoAgendamentoUser;