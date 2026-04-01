import React from "react";
import { View, Text, TextInput, TouchableOpacity, Linking, ScrollView, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Componente reutilizável de fundo com degradê
interface GradientProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const BackgroundGradient: React.FC<GradientProps> = ({ children, style }) => (
  <LinearGradient
    colors={['#1a0d8d', '#4a4fa0', '#7b8fcd']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.gradient, style]}
  >
    {children}
  </LinearGradient>
);

// Tela de Contato
const ContactScreen = () => {
  return (
    <BackgroundGradient>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>
          <Text style={styles.brand}>AirTrip</Text>
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fale conosco</Text>
          <Text style={styles.sectionText}>
            Entre em contato para mais informações sobre nossos serviços de estética e bem-estar.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Telefone:</Text>
          <Text style={styles.sectionText}>+123-456-789</Text>
          <Text style={styles.sectionText}>+111-222-333</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Email:</Text>
          <Text style={styles.sectionText}>info@airtrip.com</Text>
          <Text style={styles.sectionText}>appointments@airtrip.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Instagram:</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://www.instagram.com/airtrip")}
          >
            instagram.com/airtrip
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Facebook:</Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("https://www.facebook.com/airtrip")}
          >
            facebook.com/airtrip
          </Text>
        </View>

        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#555" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#555"
        />
        <TextInput style={styles.input} placeholder="Assunto" placeholderTextColor="#555" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Mensagem"
          multiline
          placeholderTextColor="#555"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar mensagem</Text>
        </TouchableOpacity>
      </ScrollView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  brand: {
    color: "#1a0d8d",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E342E",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4E342E",
  },
  sectionText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  link: {
    fontSize: 16,
    color: "#00d4ff",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#1a0d8d",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContactScreen;
