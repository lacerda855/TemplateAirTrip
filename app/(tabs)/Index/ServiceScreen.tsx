import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

// Importa suas telas filhas
import Login from '../usuario/Login';
import CadastroAtendimento from '../agendamento/CadastroAtendimento';
import GerenciamentoAgendamento from '../agendamento/GerenciamentoAgendamento';

interface ServiceItemProps {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  title: string;
  description: string;
}

type ViewKey = 'services' | 'login' | 'cadastro' | 'gerenciamento' | null;

export default function ServicesScreen() {
  const [modalView, setModalView] = useState<ViewKey>(null);

  const handleAgendar = async () => {
    const userType = await AsyncStorage.getItem('userType');

    // Fecha o modal atual (caso esteja aberto)
    setModalView(null);

    // Aguarda 300ms para garantir que o modal anterior se feche
    setTimeout(() => {
      if (userType === '1') setModalView('cadastro');
      else if (userType === '0') setModalView('gerenciamento');
      else setModalView('login');
    }, 300);
  };

  const renderModalContent = () => {
    switch (modalView) {
      case 'login':
        return <Login />;
      case 'cadastro':
        return <CadastroAtendimento />;
      case 'gerenciamento':
        return <GerenciamentoAgendamento />;
      default:
        return null;
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.serviceContainer}>
          <View style={styles.serviceContainer}>
            <ServiceItem
              icon="search"
              title="Tratamentos Faciais Avançados"
              description="Nossos tratamentos faciais incluem limpeza de pele profunda, peelings químicos, microagulhamento, laser facial, radiofrequência e hidratação facial intensiva."
            />
            <ServiceItem
              icon="heart"
              title="Tratamentos Corporais"
              description="Oferecemos massagens terapêuticas, lipocavitação, criolipólise, radiofrequência corporal, endermologia e envoltórios corporais para desintoxicação e hidratação."
            />
            <ServiceItem
              icon="cut"
              title="Tratamentos Capilares"
              description="Nossos tratamentos capilares incluem mesoterapia, terapia com LED, PRP capilar, detox capilar, hidratação e nutrição profunda dos fios."
            />
            <ServiceItem
              icon="stethoscope"
              title="Podologia"
              description="Oferecemos tratamento de calos e calosidades, cuidados com unhas encravadas, tratamento de micoses, reflexologia podal, hidratação e esfoliação dos pés e tratamento para pés diabéticos."
            />
            <ServiceItem
              icon="leaf"
              title="Bem-Estar e Terapias Alternativas"
              description="Nossos serviços incluem aromaterapia, acupuntura estética, terapia com pedras quentes, reflexologia, reiki e meditação guiada."
            />
            <ServiceItem
              icon="cut"
              title="Tratamentos Corporais de Estética e Remodelação"
              description="Oferecemos depilação a laser, tratamentos para estrias e cicatrizes, tratamentos para flacidez, bronzeamento artificial, clareamento de áreas específicas do corpo e terapias de esfoliação corporal e hidratação profunda."
            />
          </View>          
        </ScrollView>
        
        <View style={styles.fixedButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAgendar}>
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>

      <Modal
        visible={modalView !== null}
        animationType="slide"
        onRequestClose={() => setModalView(null)}
      >
        <View style={{ flex: 1 }}>
          {/* Botão de Voltar */}
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: '#8B4513',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setModalView(null)}
          >
            <FontAwesome name="arrow-left" size={20} color="white" />
            <Text style={{ color: 'white', marginLeft: 10, fontSize: 16 }}>Voltar</Text>
          </TouchableOpacity>

          {/* Conteúdo do Modal */}
          <View style={{ flex: 1 }}>{renderModalContent()}</View>
        </View>
      </Modal>

    </>
  );
}

// Componente ServiceItem separado, se precisar
export function ServiceItem({ icon, title, description }: ServiceItemProps) {
  return (
    <LinearGradient
      colors={['#D2B48C', '#8B4513']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.serviceItem}
    >
      <FontAwesome name={icon} size={40} color="white" style={styles.icon} />
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  serviceContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceItem: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 10,
    maxWidth: 320,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
  icon: {
    marginBottom: 15,
    backgroundColor: '#f0e6d6',
    padding: 10,
    borderRadius: 50,
  },
  serviceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    lineHeight: 22,
  },
});
