import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AboutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#8B4513', '#D2B48C', '#FFF8E1']}  // Degradê do marrom para o bege e branco
      start={{ x: 0, y: 0 }}        // Começa no canto superior esquerdo
      end={{ x: 1, y: 1 }}          // Termina no canto inferior direito
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../../assets/images/Elysium.png')} 
            style={styles.image} 
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Elysium Beautiful</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.info}>Fundação: <Text style={styles.highlight}>2010</Text></Text>
            <Text style={styles.info}>Especialidade: <Text style={styles.highlight}>Estética e Bem-Estar</Text></Text>
            <Text style={styles.info}>Idiomas: <Text style={styles.highlight}>Português, Inglês</Text></Text>
            <Text style={styles.info}>Localização: <Text style={styles.highlight}>São Paulo, Brasil</Text></Text>
            <Text style={styles.info}>Disponibilidade: <Text style={styles.highlight}>De Segunda a Sábado</Text></Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Conheça Mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>14+</Text>
            <Text style={styles.statText}>Anos de Experiência</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1000+</Text>
            <Text style={styles.statText}>Clientes Satisfeitos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>2000+</Text>
            <Text style={styles.statText}>Procedimentos Realizados</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statText}>Prêmios e Reconhecimentos</Text>
          </View>
        </View>

        {/* Modal de Saiba Mais */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sobre a Elysium</Text>
              <Text style={styles.modalDescription}>
                Na Elysium, nos dedicamos a proporcionar tratamentos estéticos faciais e corporais de alta qualidade, focados no
                bem-estar e na beleza de nossos clientes. Com anos de experiência e uma equipe altamente qualificada, estamos aqui para
                oferecer um serviço excepcional e personalizado.
              </Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Menos padding para aproximar os componentes
    alignItems: 'center',
    minHeight: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10, // Menos espaço entre a imagem e o título
  },
  image: {
    width: 160, // Ajustado para um tamanho menor
    height: 160,
    resizeMode: 'contain',
    borderRadius: 80, // Borda arredondada
  },
  content: {
    alignItems: 'center',
    marginBottom: 15, // Menos espaço após o conteúdo
  },
  title: {
    fontSize: 22, // Tamanho da fonte ajustado
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 6, // Menos espaço entre título e informações
  },
  infoContainer: {
    marginBottom: 12, // Reduziu a distância
  },
  info: {
    fontSize: 14, // Tamanho do texto ajustado
    color: '#444',
    marginBottom: 3, // Menos espaço entre as linhas
  },
  highlight: {
    fontWeight: 'bold',
    color: '#8B4513',
  },
  button: {
    backgroundColor: '#8B4513', // Marrom escuro
    paddingVertical: 8, // Menos padding para aproximar
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10, // Reduziu a distância abaixo do botão
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Ajuste no tamanho da fonte
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 10, // Menos padding nas caixas de estatísticas
    margin: 4, // Diminui o espaço entre as caixas
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  statNumber: {
    fontSize: 18, // Ajuste no tamanho da fonte
    fontWeight: 'bold',
    color: '#8B4513',
  },
  statText: {
    fontSize: 12, // Ajuste no tamanho da fonte
    textAlign: 'center',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxHeight: '80%', // Limita a altura do modal
    overflow: 'scroll',
  },
  modalTitle: {
    fontSize: 18, // Ajuste do tamanho do título
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8, // Menos espaço abaixo do título
  },
  modalDescription: {
    fontSize: 14, // Tamanho da fonte ajustado
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#8B4513', // Marrom escuro
    paddingVertical: 8, // Menos padding para o botão
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AboutScreen;
