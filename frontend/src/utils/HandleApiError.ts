import axios from 'axios';

export function handleApiError(error: unknown): { status?: number; message: string } {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Erro desconhecido';

    return {
      status,
      message,
    };
  }

  return {
    message: 'Erro inesperado. Verifique sua conexão com a internet.',
  };
}
