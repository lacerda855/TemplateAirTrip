import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type FilterType = 'all' | 'web' | 'design' | 'photography';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const portfolioItems = [
    { id: '1', imgSrc: require('../../../assets/images/p1.png'), category: 'web', title: 'Limpeza de Pele', description: 'Tratamento facial com limpeza profunda' },
    { id: '2', imgSrc: require('../../../assets/images/p2.png'), category: 'web', title: 'Massagem Relaxante', description: 'Massagem terapêutica relaxante' },
    { id: '3', imgSrc: require('../../../assets/images/p3.png'), category: 'design', title: 'Tratamento Capilar', description: 'Hidratação profunda para cabelos' },
    { id: '4', imgSrc: require('../../../assets/images/p4.png'), category: 'design', title: 'Cuidados com os Pés', description: 'Tratamento para calos e unhas encravadas' },
    { id: '5', imgSrc: require('../../../assets/images/p5.png'), category: 'photography', title: 'Terapia com Pedras Quentes', description: 'Terapia alternativa para relaxamento muscular' },
    { id: '6', imgSrc: require('../../../assets/images/p6.png'), category: 'photography', title: 'Depilação a Laser', description: 'Depilação duradoura e eficaz' },
  ];

  const filteredItems = portfolioItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalVisible(true);
  };

  const closeImageModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <LinearGradient
      colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Botões de Filtro com Scroll Horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilter]}
          onPress={() => handleFilterChange('all')}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'web' && styles.activeFilter]}
          onPress={() => handleFilterChange('web')}
        >
          <Text style={styles.filterText}>Mais Vendidos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'design' && styles.activeFilter]}
          onPress={() => handleFilterChange('design')}
        >
          <Text style={styles.filterText}>Mais Acessados</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'photography' && styles.activeFilter]}
          onPress={() => handleFilterChange('photography')}
        >
          <Text style={styles.filterText}>Mais Comentados</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Grid de Cards */}
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <View style={styles.portfolioItem}>
            <Image source={item.imgSrc} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity style={styles.viewButton} onPress={() => openImageModal(item.imgSrc)}>
                <Text style={styles.viewButtonText}>Ampliar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* Modal de Imagem Ampliada */}
      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={closeImageModal}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={closeImageModal}>
            <Text style={styles.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={typeof selectedImage === 'string' ? { uri: selectedImage } : selectedImage}
              style={styles.modalImage}
            />
          )}
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
    maxHeight: 40,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilter: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  filterText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  portfolioItem: {
    flex: 1,
    margin: 5, // reduzido para aproximar
    backgroundColor: '#D2B48C',
    borderRadius: 10,
    overflow: 'hidden',
    maxWidth: '31.5%', // controla melhor o tamanho por coluna
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 8,
    justifyContent: 'space-between',
    height: 160,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 12,
    color: '#fff',
  },
  viewButton: {
    marginTop: 8,
    backgroundColor: '#3498db',
    paddingVertical: 6,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
  }, 
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 50,
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
  modalImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Portfolio;
