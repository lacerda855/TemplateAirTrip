import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Agendamento, AgendamentoInsercao, Servico, Usuario } from './AgendamentoTypes';
import API_URL from '../../../../conf/api';

const horarios = ['08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00'];

export const useCadastroAtendimento = () => {
  const [currentAgendamento, setCurrentAgendamento] = useState<Agendamento | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [newAgendamento, setNewAgendamento] = useState<AgendamentoInsercao>({
    dataAtendimento: '',
    dthoraAgendamento: '',
    horario: '',
    fk_usuario_id: 0,
    fk_servico_id: 0,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedServico, setSelectedServico] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState('');
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedHorario, setSelectedHorario] = useState('');
  const [selectedDataAtendimento, setSelectedDataAtendimento] = useState('');

  // Inicializa a data/hora do agendamento
  useEffect(() => {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo' };
    const localDate = now.toLocaleString('sv-SE', options);
    const utcDate = new Date(localDate + 'Z');
    setNewAgendamento(prev => ({ ...prev, dthoraAgendamento: utcDate.toISOString() }));
  }, []);

  // Busca dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      await fetchAgendamentos();
      await fetchServicos();
      await fetchUsuarios();
    };
    fetchData();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const userEmailStored = await AsyncStorage.getItem('userEmail');
      if (!userEmailStored) return;

      const response = await axios.get(`${API_URL}/agendamentosUser`, {
        params: { email: userEmailStored },
      });

      const agendamentosData = response.data.map((item: any) => ({
        id: item.agendamento_id,
        dataAtendimento: item.dataatendimento,
        dthoraAgendamento: item.dthoraagendamento,
        horario: item.horario,
        usuarioNome: item.usuario_nome,
        usuario_id: item.usuario_id,
        servico_id: item.servico_id,
        tipoServico: item.tiposervico,
        usuarioEmail: item.usuario_email,
        valor: item.valor,
      }));

      setAgendamentos(agendamentosData);
    } catch (error: any) {
      console.error('Erro ao buscar agendamentos:', error.message || error);
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await axios.get(`${API_URL}/servicos`);
      setServicos(response.data);
    } catch (error: any) {
      console.error('Erro ao buscar serviços:', error.message || error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsuarios(response.data);
    } catch (error: any) {
      console.error('Erro ao buscar usuários:', error.message || error);
    }
  };

  const addAgendamento = async () => {
    if (!newAgendamento.dataAtendimento || !newAgendamento.horario || newAgendamento.fk_servico_id <= 0) {
      Alert.alert("Campos Obrigatórios", "Preencha todos os campos obrigatórios.", [{ text: "OK" }]);
      return;
    }

    await fetchAgendamentos();
    const [day1, month1, year1] = newAgendamento.dataAtendimento.split('/');
    const formattedDataAtendimento1 = `${year1}-${month1}-${day1}`;

    const horarioIndisponivel = agendamentos.some(agendamento =>
      agendamento.dataAtendimento === formattedDataAtendimento1 &&
      agendamento.horario === newAgendamento.horario
    );

    if (horarioIndisponivel) {
      const horariosIndisponiveis = agendamentos
        .filter(agendamento => agendamento.dataAtendimento === formattedDataAtendimento1)
        .map(agendamento => agendamento.horario);

      const horariosDisponiveis = horarios.filter(horario => !horariosIndisponiveis.includes(horario));

      Alert.alert(
        "Horário Indisponível",
        horariosDisponiveis.length > 0
          ? `Horários disponíveis para a data ${newAgendamento.dataAtendimento}: ${horariosDisponiveis.join(', ')}`
          : `Não há horários disponíveis para a data ${newAgendamento.dataAtendimento}.`,
        [{ text: "OK" }]
      );
      return;
    }

    const [day, month, year] = newAgendamento.dataAtendimento.split('/');
    const formattedDataAtendimento = `${year}-${month}-${day}`;
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;

    const novoAgendamento: AgendamentoInsercao = {
      dataAtendimento: formattedDataAtendimento,
      dthoraAgendamento: new Date().toISOString(),
      horario: newAgendamento.horario,
      fk_usuario_id: Number(userId),
      fk_servico_id: newAgendamento.fk_servico_id,
    };

    try {
      await axios.post(`${API_URL}/agendamento/inserir`, novoAgendamento);
      setNewAgendamento({ dataAtendimento: '', dthoraAgendamento: '', horario: '', fk_usuario_id: 0, fk_servico_id: 0 });
      setSelectedServico('');
      setSelectedUsuario('');
      fetchAgendamentos();
      Alert.alert("Sucesso", "Agendamento adicionado com sucesso!", [{ text: "OK" }]);
    } catch (error) {
      console.error('Erro ao adicionar agendamento:', error);
    }
  };

  const onChangeDate = (event: any, date?: Date, isEditMode: boolean = false) => {
    if (date) {
      const formattedDate = date.toLocaleDateString('pt-BR');
      if (isEditMode) {
        setSelectedDataAtendimento(formattedDate);
        setCurrentAgendamento(prev => prev ? { ...prev, dataAtendimento: formattedDate } : null);
      } else {
        setNewAgendamento(prev => ({ ...prev, dataAtendimento: formattedDate }));
      }
    }
    setShowDatePicker(false);
  };

  return {
    currentAgendamento,
    agendamentos,
    newAgendamento,
    showDatePicker,
    selectedDate,
    servicos,
    selectedServico,
    selectedUsuario,
    usuarios,
    selectedHorario,
    selectedDataAtendimento,
    horarios,
    setShowDatePicker,
    setSelectedDate,
    setSelectedServico,
    setSelectedUsuario,
    setNewAgendamento,
    addAgendamento,
    onChangeDate,
  };
};