import React from 'react';
import { SafeAreaView, Image, View, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Button, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from './styles/CadastroAtendimentoStyles';
import { useCadastroAtendimento } from './hooks/useCadastroAtendimento';
import { RootStackParamList } from './hooks/AgendamentoTypes';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CadastroAtendimento = () => {
  const navigation = useNavigation<NavigationProp>();
  
  const {
    newAgendamento,
    showDatePicker,
    servicos,
    selectedServico,
    horarios,
    setShowDatePicker,
    setSelectedServico,
    setNewAgendamento,
    addAgendamento,
    onChangeDate,
  } = useCadastroAtendimento();

  return (
    <PaperProvider>
      <LinearGradient colors={['#f7e7ce', '#D2B48C', '#A67B5B']} style={styles.gradientBackground}>
        <SafeAreaView style={styles.safeArea}>

          <Image source={require('../../../assets/images/AirTrip.png')} style={styles.image} />

          <View style={styles.container}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Agendamento</Text>
            </View>

            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[
                  styles.datePickerButton,
                  newAgendamento.dataAtendimento ? { borderColor: '#dc8051', borderWidth: 2 } : {}
                ]}
                activeOpacity={0.7}
              >
                <Text style={styles.datePickerText}>
                  {newAgendamento.dataAtendimento || 'Selecionar Data de Atendimento'}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => onChangeDate(event, date, false)}
                />
              )}

              <View style={[
                styles.pickerContainer,
                newAgendamento.horario ? { borderColor: '#dc8051', borderWidth: 2 } : {}
              ]}>
                <Picker
                  selectedValue={newAgendamento.horario}
                  onValueChange={(itemValue) =>
                    setNewAgendamento(prev => ({ ...prev, horario: itemValue }))
                  }
                  style={styles.picker}
                  dropdownIconColor="#A67B5B"
                >
                  <Picker.Item label="Selecione um horário" value="" />
                  {horarios.map((horario, index) => (
                    <Picker.Item key={index} label={horario} value={horario} />
                  ))}
                </Picker>
              </View>

              <View style={[
                styles.pickerContainer,
                selectedServico ? { borderColor: '#dc8051', borderWidth: 2 } : {}
              ]}>
                <Picker
                  selectedValue={selectedServico}
                  onValueChange={(itemValue) => {
                    setSelectedServico(itemValue);
                    setNewAgendamento(prev => ({ ...prev, fk_servico_id: Number(itemValue) }));
                  }}
                  style={styles.picker}
                  dropdownIconColor="#A67B5B"
                >
                  <Picker.Item label="Selecione um Serviço" value="" />
                  {servicos.map(servico => (
                    <Picker.Item key={servico.id} label={servico.tiposervico} value={servico.id.toString()} />
                  ))}
                </Picker>
              </View>

            </View>

            <View style={styles.modalFooter}>
              <Button
                mode="contained"
                onPress={addAgendamento}
                textColor="white"
                buttonColor="#A67B5B"
                contentStyle={{ flexDirection: 'row', alignItems: 'center' }}
                labelStyle={{ marginLeft: 12 }}
              >
                <Text>Adicionar Agendamento</Text>
              </Button>
            </View>

            <Text style={styles.link} onPress={() => navigation.navigate('Home')}>
              Página Inicial
            </Text>
            <Text style={styles.link} onPress={() => navigation.navigate('GerenciamentoAgendamentoUser')}>
              Gerenciamento de Agendamentos
            </Text>
          </View>

        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  );
};

export default CadastroAtendimento;