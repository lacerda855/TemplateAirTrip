import * as React from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import API_URL from '../../../../conf/api';

export interface Servico {
  id?: string;
  tiposervico: string;
  valor: string;
}

export const useGerenciamentoServico = () => {
  const [visible, setVisible] = React.useState({
    addService: false,
    editService: false,
    deleteService: false,
  });

  const [currentService, setCurrentService] = React.useState<Servico | null>(null);
  const [services, setServices] = React.useState<Servico[]>([]);
  const [newService, setNewService] = React.useState<Omit<Servico, 'id'>>({ tiposervico: '', valor: '' });
  const [visibleMenu, setVisibleMenu] = React.useState(false);
  const [campo1, setCampo1] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');

  const options = ['Tratamentos Faciais', 'Tratamentos Corporais', 'Tratamentos Capilares', 'Podologia', 'Bem-estar e Terapias Alternativas'];

  // Filtra os serviços com base na pesquisa
  const filteredServices = services.filter(service => {
    const query = searchQuery.toLowerCase();
    return (
      service.tiposervico.toLowerCase().includes(query) ||
      service.valor.toString().includes(query)
    );
  });

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/servicos`);
      setServices(response.data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', (error as Error).message);
    }
  };

  const addService = async () => {
    // Validação de campos obrigatórios
    if (!newService.tiposervico || !newService.valor) {
      Alert.alert(
        "Campos Obrigatórios",
        "Por favor, preencha todos os campos obrigatórios: tipo de serviço e valor.",
        [{ text: "OK" }]
      );
      return;
    }
    
    try {
      await axios.post(`${API_URL}/servico/inserir`, newService);
      setNewService({ tiposervico: '', valor: '' });
      setCampo1('');
      hideModal('addService');
      fetchServices();
      Alert.alert(
        "Serviço Adicionado",
        "O serviço foi adicionado com sucesso.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error('Erro ao adicionar serviço:', (error as Error).message);
    }
  };

  const updateService = async () => {
    if (currentService?.id) {
      // Validação de campos obrigatórios
      if (!currentService.tiposervico || !currentService.valor) {
        Alert.alert(
          "Campos Obrigatorios",
          "Por favor, preencha todos os campos obrigatórios: tipo de serviço e valor.",
          [{ text: "OK" }]
        );
        return;
      }
      
      try {
        await axios.put(`${API_URL}/servico/atualizar/${currentService.id}`, currentService);
        setCurrentService(null);
        hideModal('editService');
        fetchServices();
        Alert.alert(
          "Serviço Atualizado",
          "O serviço foi atualizado com sucesso.",
          [{ text: "OK" }]
        );
      } catch (error) {
        console.error('Erro ao atualizar serviço:', (error as Error).message);
      }
    }
  };

  const deleteService = async () => {
    if (currentService?.id) {
      try {
        await axios.delete(`${API_URL}/servico/deletar/${currentService.id}`);
        setCurrentService(null);
        hideModal('deleteService');
        fetchServices();
        Alert.alert(
          "Serviço Excluido",
          "O serviço foi excluido com sucesso.",
          [{ text: "OK" }]
        );
      } catch (error) {
        console.error('Erro ao deletar serviço:', (error as Error).message);
      }
    }
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const showModal = (type: 'addService' | 'editService' | 'deleteService') => {
    setVisible({ ...visible, [type]: true });
  };

  const hideModal = (type: 'addService' | 'editService' | 'deleteService') => {
    setVisible({ ...visible, [type]: false });
  };

  return {
    visible,
    currentService,
    services: filteredServices,
    newService,
    visibleMenu,
    campo1,
    options,
    searchQuery,
    setCurrentService,
    setNewService,
    setVisibleMenu,
    setCampo1,
    setSearchQuery,
    fetchServices,
    addService,
    updateService,
    deleteService,
    showModal,
    hideModal,
  };
};