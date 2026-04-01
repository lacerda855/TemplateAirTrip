import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import {
  Provider as PaperProvider,
  TextInput,
  Modal,
  Portal,
  IconButton,
  Button,
  Text,
  Menu,
  Card,
  Avatar
} from 'react-native-paper';

import { styles } from '../servico/styles/GerenciamentoServicoStyles';
import { useGerenciamentoServico } from './hooks/useGerenciamentoServico';
import { LinearGradient } from 'expo-linear-gradient';

const GerenciamentoServico = () => {
  const {
    visible,
    currentService,
    services,
    newService,
    visibleMenu,
    campo1,
    options,
    searchQuery,
    setCurrentService,
    setNewService,
    setVisibleMenu,
    setCampo1,
    setSearchQuery,
    addService,
    updateService,
    deleteService,
    showModal,
    hideModal,
  } = useGerenciamentoServico();

  const formatCurrency = (value: string) => {
    if (!value) return 'R$ 0,00';
    const number = parseFloat(value.replace(/\D/g, '')) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
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

  const getServiceColor = (serviceType: string) => {
    const colors: { [key: string]: string } = {
      'Tratamentos Faciais': '#FF6B6B',
      'Tratamentos Corporais': '#4ECDC4',
      'Tratamentos Capilares': '#45B7D1',
      'Podologia': '#96CEB4',
      'Bem-estar e Terapias Alternativas': '#FFEAA7'
    };
    return colors[serviceType] || '#A67B5B';
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
            onPress={() => showModal('addService')}
            textColor="white"
            buttonColor="#A67B5B"
            contentStyle={styles.addButtonContent}
            labelStyle={styles.addButtonLabel}
            style={styles.addButton}
          >
            Adicionar Serviço
          </Button>

          {/* Campo de pesquisa */}
          <TextInput
            label="Pesquisar"
            mode="outlined"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            style={styles.searchInput}
            outlineColor="#A67B5B"
            activeOutlineColor="#8B4513"
            left={<TextInput.Icon icon="magnify" color="#A67B5B" />}
          />

          {/* Título da Seção */}
          <View style={styles.titleContainer}>
            <Text style={styles.tableTitle}>Lista de Serviços</Text>
          </View>

          {/* Cards de Serviços */}
          <ScrollView
            contentContainerStyle={styles.cardsContainer}
            showsVerticalScrollIndicator={false}
          >
            {services.length > 0 ? (
              services.map((service, index) => (
                <Card key={service.id} style={[
                  styles.card,
                  index % 2 === 0 ? styles.cardEven : styles.cardOdd
                ]}>
                  <Card.Content style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                      <Avatar.Icon
                        size={60}
                        icon={getServiceIcon(service.tiposervico)}
                        style={[styles.serviceAvatar, { backgroundColor: getServiceColor(service.tiposervico) }]}
                        color="white"
                      />
                      <View style={styles.serviceInfo}>
                        <Text style={styles.serviceName}>{service.tiposervico}</Text>
                        <Text style={styles.serviceValue}>
                          {formatCurrency(service.valor)}
                        </Text>
                        <View style={styles.serviceTypeBadge}>
                          <Text style={styles.serviceTypeText}>
                            {service.tiposervico.split(' ')[0]}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.cardDetails}>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Tipo:</Text>
                        <Text style={styles.detailValue}>{service.tiposervico}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Valor:</Text>
                        <Text style={styles.detailValue}>{formatCurrency(service.valor)}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>ID:</Text>
                        <Text style={styles.detailValue}>{service.id}</Text>
                      </View>
                    </View>
                  </Card.Content>

                  <Card.Actions style={styles.cardActions}>
                    <Button
                      mode="contained"
                      icon="pencil"
                      onPress={() => {
                        setCurrentService(service);
                        showModal('editService');
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
                        setCurrentService(service);
                        showModal('deleteService');
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
                <Text style={styles.emptyStateText}>Nenhum serviço encontrado</Text>
                <Text style={styles.emptyStateSubtext}>
                  {searchQuery ? 'Tente ajustar os termos da pesquisa' : 'Adicione um novo serviço para começar'}
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Contador */}
          <View style={styles.footer}>
            <Text style={styles.counterText}>
              Total de serviços: {Array.isArray(services) ? services.length : 0}
            </Text>
          </View>

          {/* Modal Adicionar Serviço */}
          <Portal>
            <Modal
              visible={visible.addService}
              onDismiss={() => hideModal('addService')}
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
                      <Text style={styles.modalTitle}>Adicionar Serviço</Text>
                    </View>

                    <View style={styles.modalContent}>
                      <View style={styles.inputSection}>
                        <Text style={styles.sectionLabel}>Tipo de Serviço</Text>
                        <Menu
                          visible={visibleMenu}
                          onDismiss={() => setVisibleMenu(false)}
                          anchor={
                            <TouchableOpacity
                              style={styles.menuButton}
                              onPress={() => setVisibleMenu(true)}
                            >
                              <View style={styles.menuButtonContent}>
                                <Text style={[
                                  styles.menuButtonText,
                                  !campo1 && styles.menuButtonPlaceholder
                                ]}>
                                  {campo1 || 'Selecione o tipo de serviço'}
                                </Text>
                                <IconButton
                                  icon="chevron-down"
                                  size={20}
                                  iconColor="#A67B5B"
                                />
                              </View>
                            </TouchableOpacity>
                          }
                          contentStyle={styles.menuContent}
                        >
                          {options.map((option, index) => (
                            <Menu.Item
                              key={index}
                              onPress={() => {
                                setCampo1(option);
                                setNewService(prev => ({ ...prev, tiposervico: option }));
                                setVisibleMenu(false);
                              }}
                              title={option}
                              titleStyle={styles.menuItemText}
                              style={styles.menuItem}
                            />
                          ))}
                        </Menu>
                      </View>

                      <View style={styles.inputSection}>
                        <Text style={styles.sectionLabel}>Valor do Serviço</Text>
                        <TextInput
                          label="Valor (R$)"
                          mode="outlined"
                          value={newService.valor}
                          onChangeText={text => {
                            // Formatação monetária básica
                            const formatted = text.replace(/\D/g, '');
                            const number = parseInt(formatted) / 100;
                            setNewService(prev => ({
                              ...prev,
                              valor: formatted
                            }));
                          }}
                          style={styles.inputField}
                          outlineColor="#A67B5B"
                          activeOutlineColor="#8B4513"
                          keyboardType="numeric"
                          left={<TextInput.Icon icon="currency-usd" color="#A67B5B" />}
                          placeholder="0,00"
                        />
                        {newService.valor && (
                          <Text style={styles.currencyPreview}>
                            Valor: {formatCurrency(newService.valor)}
                          </Text>
                        )}
                      </View>

                      {/* Preview do Serviço */}
                      {campo1 && (
                        <View style={styles.servicePreview}>
                          <Text style={styles.previewTitle}>Pré-visualização</Text>
                          <View style={styles.previewCard}>
                            <View style={styles.previewHeader}>
                              <Avatar.Icon
                                size={40}
                                icon={getServiceIcon(campo1)}
                                style={[styles.previewAvatar, { backgroundColor: getServiceColor(campo1) }]}
                                color="white"
                              />
                              <View>
                                <Text style={styles.previewServiceName}>{campo1}</Text>
                                <Text style={styles.previewServiceValue}>
                                  {newService.valor ? formatCurrency(newService.valor) : 'R$ 0,00'}
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
                        onPress={addService}
                        style={styles.modalActionButton}
                        contentStyle={styles.modalButtonContent}
                        labelStyle={styles.modalButtonLabel}
                        disabled={!newService.tiposervico || !newService.valor}
                      >
                        Adicionar Serviço
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </Modal>
          </Portal>

          {/* Modal Editar Serviço */}
          <Portal>
            <Modal
              visible={visible.editService}
              onDismiss={() => hideModal('editService')}
              contentContainerStyle={styles.modalOverlay}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Editar Serviço</Text>
                </View>

                <View style={styles.modalContent}>
                  <View style={styles.inputSection}>
                    <Text style={styles.sectionLabel}>Tipo de Serviço</Text>
                    <Menu
                      visible={visibleMenu}
                      onDismiss={() => setVisibleMenu(false)}
                      anchor={
                        <TouchableOpacity
                          style={styles.menuButton}
                          onPress={() => setVisibleMenu(true)}
                        >
                          <View style={styles.menuButtonContent}>
                            <Text style={styles.menuButtonText}>
                              {currentService?.tiposervico || 'Selecione o tipo de serviço'}
                            </Text>
                            <IconButton
                              icon="chevron-down"
                              size={20}
                              iconColor="#A67B5B"
                            />
                          </View>
                        </TouchableOpacity>
                      }
                      contentStyle={styles.menuContent}
                    >
                      {options.map((option, index) => (
                        <Menu.Item
                          key={index}
                          onPress={() => {
                            setCurrentService(prev => prev ? { ...prev, tiposervico: option } : null);
                            setVisibleMenu(false);
                          }}
                          title={option}
                          titleStyle={styles.menuItemText}
                          style={styles.menuItem}
                        />
                      ))}
                    </Menu>
                  </View>

                  <View style={styles.inputSection}>
                    <Text style={styles.sectionLabel}>Valor do Serviço</Text>
                    <TextInput
                      label="Valor (R$)"
                      mode="outlined"
                      value={currentService?.valor || ''}
                      onChangeText={text => setCurrentService(prev => prev ? { ...prev, valor: text } : null)}
                      style={styles.inputField}
                      outlineColor="#A67B5B"
                      activeOutlineColor="#8B4513"
                      keyboardType="numeric"
                      left={<TextInput.Icon icon="currency-usd" color="#A67B5B" />}
                    />
                    {currentService?.valor && (
                      <Text style={styles.currencyPreview}>
                        Valor: {formatCurrency(currentService.valor)}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.modalFooter}>
                  <Button
                    mode="contained"
                    onPress={updateService}
                    style={styles.modalActionButton}
                    contentStyle={styles.modalButtonContent}
                    labelStyle={styles.modalButtonLabel}
                  >
                    Atualizar Serviço
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>

          {/* Modal Deletar Serviço */}
          <Portal>
            <Modal
              visible={visible.deleteService}
              onDismiss={() => hideModal('deleteService')}
              contentContainerStyle={styles.modalOverlay}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
                </View>

                <View style={styles.modalContent}>
                  <View style={styles.deleteConfirmation}>
                    <View style={styles.deleteServiceInfo}>
                      <Avatar.Icon
                        size={60}
                        icon={getServiceIcon(currentService?.tiposervico || '')}
                        style={[styles.deleteAvatar, { backgroundColor: getServiceColor(currentService?.tiposervico || '') }]}
                        color="white"
                      />
                      <View>
                        <Text style={styles.deleteServiceName}>{currentService?.tiposervico}</Text>
                        <Text style={styles.deleteServiceValue}>
                          {currentService?.valor ? formatCurrency(currentService.valor) : 'R$ 0,00'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.deleteText}>
                      Deseja realmente excluir este serviço?
                    </Text>
                    <Text style={styles.deleteSubtext}>
                      Esta ação não pode ser desfeita.
                    </Text>
                  </View>
                </View>

                <View style={styles.modalFooter}>
                  <Button
                    mode="outlined"
                    onPress={() => hideModal('deleteService')}
                    style={styles.cancelButton}
                    contentStyle={styles.modalButtonContent}
                    labelStyle={styles.cancelButtonLabel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    mode="contained"
                    onPress={deleteService}
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

export default GerenciamentoServico;