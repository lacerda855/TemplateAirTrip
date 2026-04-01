import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20    
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },

  // Botão Adicionar
  addButton: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  addButtonLabel: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },

  // Campo de Pesquisa
  searchInput: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  // Título
  titleContainer: {
    backgroundColor: '#A67B5B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  // Container dos Cards
  cardsContainer: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },

  // Cards de Serviços
  card: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#E8D6C9',
    overflow: 'hidden',
  },
  cardEven: {
    borderLeftWidth: 4,
    borderLeftColor: '#A67B5B',
  },
  cardOdd: {
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceAvatar: {
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  serviceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#27AE60',
    marginBottom: 8,
  },
  serviceTypeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8D6C9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  serviceTypeText: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: '600',
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#2D2D2D',
    fontWeight: '400',
  },
  cardActions: {
    padding: 16,
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  buttonContent: {
    height: 40,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#A67B5B',
    borderRadius: 8,
    borderWidth: 0,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#E74C3C',
    borderRadius: 8,
  },
  deleteButtonLabel: {
    color: '#E74C3C',
    fontSize: 14,
    fontWeight: '600',
  },

  // Estado Vazio
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  // Footer
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8D6C9',
  },
  counterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A67B5B',
    textAlign: 'center',
  },

  // Modais
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  modalScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: '#E8D6C9',
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#A67B5B',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContent: {
    padding: 24,
  },

  // Seções de Input
  inputSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 8,
  },

  // Menu Button
  menuButton: {
    borderWidth: 1,
    borderColor: '#A67B5B',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  menuButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 56,
  },
  menuButtonText: {
    fontSize: 16,
    color: '#2D2D2D',
    flex: 1,
  },
  menuButtonPlaceholder: {
    color: '#999',
  },
  menuContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 4,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    color: '#2D2D2D',
    fontSize: 14,
  },

  // Input Field
  inputField: {
    backgroundColor: '#FFFFFF',
  },
  currencyPreview: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },

  // Preview do Serviço
  servicePreview: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D6C9',
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewAvatar: {
    marginRight: 12,
  },
  previewServiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  previewServiceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },

  // Confirmação de Exclusão
  deleteConfirmation: {
    alignItems: 'center',
  },
  deleteServiceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    width: '100%',
  },
  deleteAvatar: {
    marginRight: 16,
  },
  deleteServiceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  deleteServiceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  deleteText: {
    fontSize: 16,
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 8,
  },
  deleteSubtext: {
    fontSize: 14,
    color: '#E74C3C',
    textAlign: 'center',
  },

  // Footer dos Modais
  modalFooter: {
    padding: 24,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalActionButton: {
    flex: 1,
    backgroundColor: '#A67B5B',
    borderRadius: 12,
    elevation: 3,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#A67B5B',
    borderRadius: 12,
  },
  cancelButtonLabel: {
    color: '#A67B5B',
    fontWeight: '600',
  },
  confirmDeleteButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    borderRadius: 12,
    elevation: 3,
  },
  modalButtonContent: {
    height: 50,
  },
  modalButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});