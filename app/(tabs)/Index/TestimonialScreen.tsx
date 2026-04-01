import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, Modal, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Testimonial {
  image: any;
  comment: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    image: require('../../../assets/images/Perfil1.png'),
    comment: 'Estou muito feliz com os resultados do tratamento na AirTrip. A equipe é extremamente profissional e atenciosa. Recomendo!',
    name: 'Carla Silva',
    role: 'Cliente Satisfeita',
  },
  {
    image: require('../../../assets/images/Perfil2.png'),
    comment: 'Os serviços na AirTrip realmente fazem a diferença. Estou muito feliz com os resultados!',
    name: 'Marcos Oliveira',
    role: 'Cliente Fiel',
  },
  {
    image: require('../../../assets/images/Perfil3.png'),
    comment: 'Excelente atendimento e resultados incríveis nos serviços. Recomendo a AirTrip para todos!',
    name: 'Patrícia Santos',
    role: 'Cliente Satisfeita',
  },
  {
    image: require('../../../assets/images/Perfil4.png'),
    comment: 'Profissionais competentes e ambiente acolhedor. Sempre saio da clínica renovado!',
    name: 'Lucas Mendes',
    role: 'Cliente Satisfeito',
  },
  {
    image: require('../../../assets/images/Perfil5.png'),
    comment: 'Eu amo os serviços da AirTrip. Minha experiência foi excelente!',
    name: 'Ana Clara',
    role: 'Cliente Satisfeita',
  },
];

const TestimonialScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [testimonialsData, setTestimonialsData] = useState(testimonials);

  const addTestimonial = () => {
    if (newName && newComment) {
      const newTestimonial: Testimonial = {
        image: require('../../../assets/images/Perfil1.png'),
        comment: newComment,
        name: newName,
        role: 'Novo Cliente',
      };
      setTestimonialsData([...testimonialsData, newTestimonial]);
      setModalVisible(false);
      setNewName('');
      setNewComment('');
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <LinearGradient
      colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.testimonialList}>
        {testimonialsData.map((item, index) => (
          <View key={index} style={styles.testimonialItem}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.quoteIcon}>“</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <View style={styles.intro}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Adicionar Depoimento</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Compartilhar sua experiência</Text>

            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#aaa"
              value={newName}
              onChangeText={setNewName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Seu depoimento"
              placeholderTextColor="#aaa"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={addTestimonial}>
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testimonialList: {
    padding: 20,
    alignItems: 'center',
  },
  testimonialItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: '95%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
   
  // Borda
  borderWidth: 2,
  borderColor: '#A67B5B',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    marginBottom: 10,
  },
  quoteIcon: {
    fontSize: 40,
    color: '#d3b08d',
    position: 'absolute',
    top: 10,
    left: 20,
  },
  comment: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#444',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 22,
  },
  intro: {
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#8B4513',
  },
  role: {
    fontSize: 14,
    color: '#777',
  },
  addButton: {
    backgroundColor: '#8B4513',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 40,
    marginVertical: 60,
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TestimonialScreen;
