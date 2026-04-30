import { useState } from 'react';

// Tipos para voos
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  stops: number;
  url: string;
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
}

// Hook para busca de voos
export const useFlightSearch = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para simular busca de voos (usando dados mock)
  // Em produção, substitua por chamada real à API (ex: Amadeus)
  const searchFlights = async (params: SearchParams): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Validação básica
      if (!params.origin || !params.destination) {
        throw new Error('Origem e destino são obrigatórios.');
      }
      if (params.origin === params.destination) {
        throw new Error('Origem e destino não podem ser iguais.');
      }

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Dados mock (substitua por chamada real)
      const mockFlights: Flight[] = [
        {
          id: '1',
          airline: 'LATAM',
          flightNumber: 'LA1234',
          departure: {
            airport: params.origin,
            time: '08:00',
            date: params.departureDate,
          },
          arrival: {
            airport: params.destination,
            time: '10:30',
            date: params.departureDate,
          },
          duration: '2h 30m',
          price: 450,
          stops: 0,
          url: `https://www.latam.com/booking?from=${params.origin}&to=${params.destination}&flight=LA1234`,
        },
        {
          id: '2',
          airline: 'GOL',
          flightNumber: 'G31567',
          departure: {
            airport: params.origin,
            time: '14:00',
            date: params.departureDate,
          },
          arrival: {
            airport: params.destination,
            time: '16:45',
            date: params.departureDate,
          },
          duration: '2h 45m',
          price: 380,
          stops: 1,
          url: `https://www.voegol.com.br/search?from=${params.origin}&to=${params.destination}&flight=G31567`,
        },
        {
          id: '3',
          airline: 'AZUL',
          flightNumber: 'AD7890',
          departure: {
            airport: params.origin,
            time: '18:30',
            date: params.departureDate,
          },
          arrival: {
            airport: params.destination,
            time: '21:00',
            date: params.departureDate,
          },
          duration: '2h 30m',
          price: 520,
          stops: 0,
          url: `https://www.voeazul.com.br/search?from=${params.origin}&to=${params.destination}&flight=AD7890`,
        },
      ];

      setFlights(mockFlights);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar voos.');
    } finally {
      setLoading(false);
    }
  };

  return {
    flights,
    loading,
    error,
    searchFlights,
  };
};