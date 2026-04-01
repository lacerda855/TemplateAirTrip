export type RootStackParamList = {
  Home: undefined;
  GerenciamentoAgendamentoUser: undefined;
};

export type Agendamento = {
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
};

export type AgendamentoInsercao = {
  dataAtendimento: string;
  dthoraAgendamento: string;
  horario: string;
  fk_usuario_id: number;
  fk_servico_id: number;
};

export type Servico = {
  id: number;
  tiposervico: string;
  valor: number;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: number;
};
