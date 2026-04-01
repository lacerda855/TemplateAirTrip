import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const airports = [
  { code: 'GIG', city: 'Rio de Janeiro', country: 'RJ' },
  { code: 'GRU', city: 'São Paulo', country: 'SP' },
  { code: 'BSB', city: 'Brasília', country: 'DF' },
  { code: 'SDU', city: 'Santos Dumont', country: 'RJ' },
  { code: 'CNF', city: 'Belo Horizonte', country: 'MG' },
  { code: 'CGB', city: 'Cuiabá', country: 'MT' },
  { code: 'CWB', city: 'Curitiba', country: 'PR' },
  { code: 'MAO', city: 'Manaus', country: 'AM' },
  { code: 'REC', city: 'Recife', country: 'PE' },
  { code: 'SSA', city: 'Salvador', country: 'BA' },
  { code: 'FOR', city: 'Fortaleza', country: 'CE' },
  { code: 'IGU', city: 'Foz do Iguaçu', country: 'PR' },
];

export default function SearchFlightsScreen() {
  const [tripType, setTripType] = useState('roundtrip'); // 'oneway' ou 'roundtrip'
  const [departure, setDeparture] = useState<any>(null);
  const [arrival, setArrival] = useState<any>(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
  const [passengers, setPassengers] = useState(1);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showAirportModal, setShowAirportModal] = useState(false);
  const [airportModalType, setAirportModalType] = useState('departure');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAirportSelect = (airport: any) => {
    if (airportModalType === 'departure') {
      setDeparture(airport);
    } else {
      setArrival(airport);
    }
    setShowAirportModal(false);
    setSearchQuery('');
  };

  const filteredAirports = airports.filter(
    (airport) =>
      airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDateChange = (event: any, selectedDate: any, type: any) => {
    if (type === 'departure') {
      setShowDeparturePicker(false);
      if (selectedDate) setDepartureDate(selectedDate);
    } else {
      setShowReturnPicker(false);
      if (selectedDate) setReturnDate(selectedDate);
    }
  };

  const formatDate = (date: any) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <LinearGradient
      colors={['#1a0d8d', '#2d1a9f', '#3d25b0']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo e Título */}
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/AirTrip.png')}
            style={styles.headerLogo}
          />
          <Text style={styles.title}>Buscar Voos</Text>
        </View>

        {/* Tipo de Viagem */}
        <View style={styles.tripTypeSection}>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              tripType === 'oneway' && styles.tripTypeButtonActive,
            ]}
            onPress={() => setTripType('oneway')}
          >
            <MaterialIcons
              name="flight-takeoff"
              size={20}
              color={tripType === 'oneway' ? '#fff' : '#9ab8d9'}
            />
            <Text
              style={[
                styles.tripTypeText,
                tripType === 'oneway' && styles.tripTypeTextActive,
              ]}
            >
              Ida
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              tripType === 'roundtrip' && styles.tripTypeButtonActive,
            ]}
            onPress={() => setTripType('roundtrip')}
          >
            <MaterialIcons
              name="flight-land"
              size={20}
              color={tripType === 'roundtrip' ? '#fff' : '#9ab8d9'}
            />
            <Text
              style={[
                styles.tripTypeText,
                tripType === 'roundtrip' && styles.tripTypeTextActive,
              ]}
            >
              Ida e Volta
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulário de Busca */}
        <View style={styles.searchForm}>
          {/* Origem */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>De (Origem)</Text>
            <TouchableOpacity
              style={styles.airportInput}
              onPress={() => {
                setAirportModalType('departure');
                setShowAirportModal(true);
              }}
            >
              <MaterialIcons name="flight-takeoff" size={20} color="#00d4ff" />
              <Text style={styles.airportInputText}>
                {departure ? `${departure.code} - ${departure.city}` : 'Selecione a origem'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Destino */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Para (Destino)</Text>
            <TouchableOpacity
              style={styles.airportInput}
              onPress={() => {
                setAirportModalType('arrival');
                setShowAirportModal(true);
              }}
            >
              <MaterialIcons name="flight-land" size={20} color="#00d4ff" />
              <Text style={styles.airportInputText}>
                {arrival ? `${arrival.code} - ${arrival.city}` : 'Selecione o destino'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Datas */}
          <View style={styles.datesRow}>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Ida</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDeparturePicker(true)}
              >
                <MaterialIcons name="calendar-today" size={18} color="#00d4ff" />
                <Text style={styles.dateInputText}>{formatDate(departureDate)}</Text>
              </TouchableOpacity>
            </View>

            {tripType === 'roundtrip' && (
              <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Volta</Text>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowReturnPicker(true)}
                >
                  <MaterialIcons name="calendar-today" size={18} color="#00d4ff" />
                  <Text style={styles.dateInputText}>{formatDate(returnDate)}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Passageiros */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Passageiros</Text>
            <View style={styles.passengerControl}>
              <TouchableOpacity
                style={styles.passengerButton}
                onPress={() => passengers > 1 && setPassengers(passengers - 1)}
              >
                <MaterialIcons name="remove" size={20} color="#fff" />
              </TouchableOpacity>

              <Text style={styles.passengerCount}>{passengers}</Text>

              <TouchableOpacity
                style={styles.passengerButton}
                onPress={() => passengers < 9 && setPassengers(passengers + 1)}
              >
                <MaterialIcons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Botão de Busca */}
          <LinearGradient
            colors={['#00d4ff', '#4a4fa0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.searchButton}
          >
            <MaterialIcons name="search" size={20} color="#fff" />
            <Text style={styles.searchButtonText}>Buscar Voos</Text>
          </LinearGradient>
        </View>

        {/* Dicas de Viagem */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Dicas para Economizar</Text>

          <View style={styles.tipCard}>
            <MaterialIcons name="info" size={20} color="#00d4ff" />
            <Text style={styles.tipText}>Voe na terça ou quarta para melhores preços</Text>
          </View>

          <View style={styles.tipCard}>
            <MaterialIcons name="info" size={20} color="#00d4ff" />
            <Text style={styles.tipText}>Reserve com até 3 meses de antecedência</Text>
          </View>

          <View style={styles.tipCard}>
            <MaterialIcons name="info" size={20} color="#00d4ff" />
            <Text style={styles.tipText}>Voos noturnos geralmente têm preços menores</Text>
          </View>

          <View style={styles.tipCard}>
            <MaterialIcons name="info" size={20} color="#00d4ff" />
            <Text style={styles.tipText}>Use alertas de preço para acompanhar ofertas</Text>
          </View>
        </View>

        {/* Modal de Seleção de Aeroporto */}
        <Modal
          visible={showAirportModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowAirportModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {airportModalType === 'departure'
                    ? 'Selecione a Origem'
                    : 'Selecione o Destino'}
                </Text>
                <TouchableOpacity onPress={() => setShowAirportModal(false)}>
                  <MaterialIcons name="close" size={28} color="#fff" />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.searchInput}
                placeholder="Buscar cidade ou código..."
                placeholderTextColor="#9ab8d9"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              <FlatList
                data={filteredAirports}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.airportItem}
                    onPress={() => handleAirportSelect(item)}
                  >
                    <View style={styles.airportItemContent}>
                      <Text style={styles.airportCode}>{item.code}</Text>
                      <View>
                        <Text style={styles.airportCity}>{item.city}</Text>
                        <Text style={styles.airportCountry}>{item.country}</Text>
                      </View>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#00d4ff" />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* DateTime Pickers */}
        {showDeparturePicker && (
          <DateTimePicker
            value={departureDate}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'departure')}
            minimumDate={new Date()}
          />
        )}

        {showReturnPicker && (
          <DateTimePicker
            value={returnDate}
            mode="date"
            display="default"
            onChange={(event, date) => handleDateChange(event, date, 'return')}
            minimumDate={departureDate}
          />
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  tripTypeSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  tripTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    gap: 8,
  },
  tripTypeButtonActive: {
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    borderColor: '#00d4ff',
  },
  tripTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ab8d9',
  },
  tripTypeTextActive: {
    color: '#fff',
  },
  searchForm: {
    paddingHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ab8d9',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  airportInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    gap: 10,
  },
  airportInputText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    gap: 8,
  },
  dateInputText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  passengerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    gap: 15,
  },
  passengerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00d4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  searchButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#00d4ff',
    gap: 12,
    alignItems: 'center',
  },
  tipText: {
    color: '#9ab8d9',
    fontSize: 13,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#1a0d8d',
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 212, 255, 0.2)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchInput: {
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  airportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 212, 255, 0.1)',
  },
  airportItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  airportCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00d4ff',
    minWidth: 45,
  },
  airportCity: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  airportCountry: {
    fontSize: 12,
    color: '#9ab8d9',
    marginTop: 2,
  },
});
