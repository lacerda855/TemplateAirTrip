import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContent: {
    marginBottom: 20,
  },
  agendamentoInput: {
    marginBottom: 10,
  },
  pickerContainer: {
    height: 53,
    borderWidth: 1.5,
    borderColor: '#A67B5B',
    borderRadius: 8,
    backgroundColor: '#fff6f0',
    justifyContent: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: '100%',
    width: '100%',
    color: '#5a3e2b',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 50,
    alignSelf: 'center',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#A67B5B',
    fontWeight: 'bold',
  },
  datePickerButton: {
    height: 53,
    borderWidth: 1.5,
    borderColor: '#A67B5B',
    borderRadius: 8,
    backgroundColor: '#fff6f0',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  datePickerText: {
    color: '#5a3e2b',
    fontSize: 16,
  },
});