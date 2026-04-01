import * as React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_URL from '../../../../conf/api';

export interface Agendamento {
  id?: number;
  dataAtendimento: string;
  dthoraAgendamento: string;
  horario: string;
  usuario_id: number;
  servico_id: number;
  usuarioNome?: string;
  tipoServico?: string;
  usuarioEmail?: string;
  valor?: number;
  fk_usuario_id: number;
  fk_servico_id: number;
}

export interface AgendamentoInsercao {
  dataAtendimento: string;
  dthoraAgendamento: string;
  horario: string;
  fk_usuario_id: number;
  fk_servico_id: number;
}

export interface Servico {
  id: number;
  tiposervico: string;
  valor: number;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: number;
}

export const useGerenciamentoAgendamento = () => {
  const [visible, setVisible] = React.useState({
    addAgendamento: false,
    editAgendamento: false,
    deleteAgendamento: false,
  });

  const [currentAgendamento, setCurrentAgendamento] = React.useState<Agendamento | null>(null);
  const [agendamentos, setAgendamentos] = React.useState<Agendamento[]>([]);
  const [newAgendamento, setNewAgendamento] = React.useState<AgendamentoInsercao>({
    dataAtendimento: '',
    dthoraAgendamento: '',
    horario: '',
    fk_usuario_id: 0,
    fk_servico_id: 0,
  });
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [servicos, setServicos] = React.useState<Servico[]>([]);
  const [selectedServico, setSelectedServico] = React.useState('');
  const [selectedUsuario, setSelectedUsuario] = React.useState('');
  const [usuarios, setUsuarios] = React.useState<Usuario[]>([]);
  const [selectedHorario, setSelectedHorario] = React.useState('');
  const [selectedDataAtendimento, setSelectedDataAtendimento] = React.useState('');
  const [selectedDateEditar, setSelectedDateEditar] = React.useState(new Date());
  const [showDatePickerEditar, setShowDatePickerEditar] = React.useState(false);
  const [selectedHorarioEditar, setSelectedHorarioEditar] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const horarios = [
    '08:00:00',
    '09:00:00',
    '10:00:00',
    '11:00:00',
    '12:00:00',
  ];

  // Filtra os agendamentos com base na pesquisa
  const filteredAgendamentos = agendamentos.filter(agendamento => {
    const query = searchQuery.toLowerCase();
    return (
      agendamento.dataAtendimento.toLowerCase().includes(query) ||
      agendamento.usuarioNome?.toLowerCase().includes(query) ||
      agendamento.tipoServico?.toLowerCase().includes(query) ||
      agendamento.usuarioEmail?.toLowerCase().includes(query) ||
      agendamento.valor?.toString().includes(query)
    );
  });

  React.useEffect(() => {
    const now = new Date();
    const options = { timeZone: 'America/Sao_Paulo' };
    const localDate = now.toLocaleString('sv-SE', options);
    const utcDate = new Date(localDate + 'Z');
    setNewAgendamento(prev => ({ ...prev, dthoraAgendamento: utcDate.toISOString() }));
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/agendamentos_vw`);
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao buscar agendamentos:', error.message);
      } else {
        console.error('Erro desconhecido ao buscar agendamentos:', error);
      }
    }
  };

  const fetchServicos = async () => {
    try {
      const response = await axios.get(`${API_URL}/servicos`);
      const servicosData: Servico[] = response.data.map((item: any) => ({
        id: item.id,
        tiposervico: item.tiposervico,
        valor: item.valor,
      }));
      setServicos(servicosData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao buscar serviços:', error.message);
      } else {
        console.error('Erro desconhecido ao buscar serviços:', error);
      }
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      const usuariosData: Usuario[] = response.data.map((item: any) => ({
        id: item.id,
        nome: item.nome,
        email: item.email,
        tipoUsuario: item.tipoUsuario,
      }));
      setUsuarios(usuariosData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erro ao buscar usuários:', error.message);
      } else {
        console.error('Erro desconhecido ao buscar usuários:', error);
      }
    }
  };

  const addAgendamento = async () => {
    console.log('Novo Agendamento:', newAgendamento);

    if (!newAgendamento.dataAtendimento || !newAgendamento.horario || newAgendamento.fk_servico_id <= 0) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha todos os campos obrigatórios: data de atendimento, horário e serviço.",
        [{ text: "OK" }]
      );
      return;
    }

    await fetchAgendamentos();

    const [day1, month1, year1] = newAgendamento.dataAtendimento.split('/');
    const formattedDataAtendimento1 = `${year1}-${month1}-${day1}`;

    const horarioIndisponivel = agendamentos.some(agendamento => {
      if (!agendamento.dataAtendimento) {
        console.warn('dataAtendimento está indefinido para um dos agendamentos:', agendamento);
        return false;
      }
      return agendamento.dataAtendimento === formattedDataAtendimento1 &&
        agendamento.horario === newAgendamento.horario;
    });

    if (horarioIndisponivel) {
      const horariosIndisponiveis = agendamentos
        .filter(agendamento => agendamento.dataAtendimento === formattedDataAtendimento1)
        .map(agendamento => agendamento.horario);

      const horariosDisponiveis = horarios.filter(horario => !horariosIndisponiveis.includes(horario));

      if (horariosDisponiveis.length > 0) {
        Alert.alert(
          "Horário Indisponível",
          `Este horário e data de atendimento já estão ocupados. Horários disponíveis para a data ${newAgendamento.dataAtendimento}: ${horariosDisponiveis.join(', ')}`,
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Horário Indisponível",
          `Este horário e data de atendimento já estão ocupados. Não há horários disponíveis para a data ${newAgendamento.dataAtendimento}.`,
          [{ text: "OK" }]
        );
      }
      return;
    }

    const [day, month, year] = newAgendamento.dataAtendimento.split('/');
    const formattedDataAtendimento = `${year}-${month}-${day}`;

    const userId = await AsyncStorage.getItem('userId');

    if (userId === null) {
      console.error('userId não encontrado no AsyncStorage');
      return;
    }

    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      console.error('userId não é um número válido');
      return;
    }

    const novoAgendamento: AgendamentoInsercao = {
      dataAtendimento: formattedDataAtendimento,
      dthoraAgendamento: new Date().toISOString(),
      horario: newAgendamento.horario,
      fk_usuario_id: userIdNumber,
      fk_servico_id: newAgendamento.fk_servico_id,
    };

    try {
      await axios.post(`${API_URL}/agendamento/inserir`, novoAgendamento);
      setNewAgendamento({
        dataAtendimento: '',
        dthoraAgendamento: '',
        horario: '',
        fk_usuario_id: 0,
        fk_servico_id: 0,
      });
      setSelectedServico('');
      setSelectedUsuario('');
      hideModal('addAgendamento');
      fetchAgendamentos();

      Alert.alert(
        "Agendamento Adicionado",
        "O agendamento foi adicionado com sucesso!",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error('Erro ao adicionar agendamento:', error);
    }
  };

  const validateAndUpdateAgendamento = () => {
    if (!currentAgendamento) {
      Alert.alert("Erro", "Agendamento não encontrado.");
      return;
    }

    if (!selectedDataAtendimento || !selectedHorarioEditar || !selectedServico) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha todos os campos obrigatórios: data de atendimento, horário e serviço.",
        [{ text: "OK" }]
      );
      return;
    }

    const agendamentoExistente = agendamentos.find(agendamento =>
      agendamento.dataAtendimento === selectedDataAtendimento &&
      agendamento.horario === selectedHorarioEditar
    );

    if (agendamentoExistente) {
      const horariosIndisponiveis = agendamentos
        .filter(agendamento => agendamento.dataAtendimento === selectedDataAtendimento)
        .map(agendamento => agendamento.horario);

      const horariosDisponiveis = horarios.filter(horario => !horariosIndisponiveis.includes(horario));

      if (horariosDisponiveis.length > 0) {
        Alert.alert(
          "Horário Indisponível",
          `Este horário e data de atendimento já estão ocupados. Horários disponíveis para a data ${selectedDataAtendimento}: ${horariosDisponiveis.join(', ')}`,
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Horário Indisponível",
          `Este horário e data de atendimento já estão ocupados. Não há horários disponíveis para a data ${selectedDataAtendimento}.`,
          [{ text: "OK" }]
        );
      }
      return;
    }

    updateAgendamento();
  };

  const updateAgendamento = async () => {
    if (currentAgendamento?.id) {
      console.log('Dados a serem enviados:', currentAgendamento);

      const userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        console.error('userId não encontrado no AsyncStorage');
        Alert.alert('Erro', 'userId não encontrado. Faça login novamente.');
        return;
      }

      const userIdNumber = Number(userId);

      if (isNaN(userIdNumber)) {
        console.error('userId não é um número válido');
        Alert.alert('Erro', 'O userId é inválido. Tente novamente.');
        return;
      }

      const agendamentoAtualizado = {
        dataatendimento: currentAgendamento.dataAtendimento,
        dthoraAgendamento: currentAgendamento.dthoraAgendamento,
        horario: currentAgendamento.horario,
        fk_usuario_id: userIdNumber,
        fk_servico_id: currentAgendamento.fk_servico_id,
      };

      try {
        const response = await axios.put(`${API_URL}/agendamento/atualizar/${currentAgendamento.id}`, agendamentoAtualizado);
        console.log('Resposta do servidor:', response.data);

        setCurrentAgendamento(null);
        hideModal('editAgendamento');
        fetchAgendamentos();

        Alert.alert(
          "Agendamento Atualizado",
          "O agendamento foi atualizado com sucesso!",
          [{ text: "OK" }]
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erro ao atualizar agendamento:', error.message);
          Alert.alert("Erro", "Não foi possível atualizar o agendamento. Tente novamente.");
        } else {
          console.error('Erro desconhecido ao atualizar agendamento:', error);
        }
      }
    } else {
      Alert.alert("Erro", "Agendamento não encontrado.");
    }
  };

  const deleteAgendamento = async () => {
    if (currentAgendamento?.id) {
      try {
        await axios.delete(`${API_URL}/agendamento/deletar/${currentAgendamento.id}`);
        setCurrentAgendamento(null);
        hideModal('deleteAgendamento');
        fetchAgendamentos();
        Alert.alert(
          "Agendamento Excluido",
          "O agendamento foi excluido com sucesso!",
          [{ text: "OK" }]
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao deletar agendamento:', error.message);
        } else {
          console.error('Erro desconhecido ao deletar agendamento:', error);
        }
      }
    }
  };

  const showModal = (type: 'addAgendamento' | 'editAgendamento' | 'deleteAgendamento') => {
    if (type === 'editAgendamento' && currentAgendamento) {
      const dateParts = currentAgendamento.dataAtendimento.split('/');
      const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
      setSelectedDataAtendimento('');
      setSelectedHorarioEditar('');
      setSelectedUsuario('');
      setSelectedServico('');
    }
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type: 'addAgendamento' | 'editAgendamento' | 'deleteAgendamento') => {
    setVisible({ ...visible, [type]: false });
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

  React.useEffect(() => {
    const fetchData = async () => {
      const storedUserType = await AsyncStorage.getItem('userType');
      const userTypeNumber = storedUserType ? Number(storedUserType) : null;

      fetchAgendamentos();
      fetchServicos();
      fetchUsuarios();
    };

    fetchData();
  }, []);

  return {
    visible,
    currentAgendamento,
    agendamentos: filteredAgendamentos,
    newAgendamento,
    showDatePicker,
    servicos,
    selectedServico,
    usuarios,
    selectedDataAtendimento,
    showDatePickerEditar,
    selectedHorarioEditar,
    searchQuery,
    horarios,
    setShowDatePicker,
    setSelectedServico,
    setNewAgendamento,
    setSelectedDataAtendimento,
    setShowDatePickerEditar,
    setSelectedHorarioEditar,
    setSearchQuery,
    setCurrentAgendamento,
    addAgendamento,
    validateAndUpdateAgendamento,
    deleteAgendamento,
    showModal,
    hideModal,
    onChangeDate,
  };
};