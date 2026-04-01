import React from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  FlatList, ListRenderItem, Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const images = {
  b1: require('../../../assets/images/b1.png'),
  b2: require('../../../assets/images/b2.png'),
  b3: require('../../../assets/images/b3.png'),
  b4: require('../../../assets/images/b4.png'),
  b5: require('../../../assets/images/b5.png'),
};

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  image: any;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cuidados com a pele durante o verão',
    date: '20 de março de 2024',
    author: 'Brasil Agora',
    image: images.b1,
    link: 'https://brasilagoraonline.com.br/noticias/2024/01/cuidados-com-a-pele-no-verao-especialista-destaca-a-importancia-da-protecao-dermatologica/',
  },
  {
    id: '2',
    title: 'Benefícios do tratamento facial com produtos naturais',
    date: '24 de maio de 2022',
    author: 'Marie Claire',
    image: images.b2,
    link: 'https://revistamarieclaire.globo.com/Beleza/noticia/2022/05/ativos-organicos-e-naturais-potencializam-acao-de-produtos-na-rotina-de-skincare.html',
  },
  {
    id: '3',
    title: 'Dicas de beleza para uma pele radiante no inverno',
    date: '29 de fevereiro de 2024',
    author: 'iapcosmeticos',
    image: images.b3,
    link: 'https://blog.iapcosmeticos.com.br/pele-no-inverno/',
  },
  {
    id: '4',
    title: 'Os melhores tratamentos para rejuvenescimento facial',
    date: '30 de abril de 2024',
    author: 'Dermaclub',
    image: images.b4,
    link: 'https://www.dermaclub.com.br/blog/rosto/pele-madura.html',
  },
  {
    id: '5',
    title: 'Cuidados com a pele no dia a dia: dicas essenciais',
    date: '04 de janeiro de 2024',
    author: 'Vogue',
    image: images.b5,
    link: 'https://vogue.globo.com/beleza/noticia/2024/01/5-dicas-para-ter-uma-pele-saudavel-em-2024-indicadas-por-uma-dermatologista.ghtml',
  },
];

const BlogScreen: React.FC = () => {
  const renderItem: ListRenderItem<BlogPost> = ({ item }) => (
    <View style={styles.blogItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.intro}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.button}>
          <Text style={styles.buttonText}>Leia mais</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.heading}>Dicas & Cuidados com a Pele</Text>

      <FlatList
        data={blogPosts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF8E1',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  flatList: {
    paddingHorizontal: 15,
  },
  blogItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: 360,
    height: 400,
       
  // Borda
  borderWidth: 2,
  borderColor: '#A67B5B',
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 12,
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 5,
  },
  intro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  date: {
    fontSize: 13,
    color: '#8E8E93',
  },
  author: {
    fontSize: 13,
    color: '#8E8E93',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4E342E',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A67B5B',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default BlogScreen;
