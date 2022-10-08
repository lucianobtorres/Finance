export enum TypeToast {
  SUCCESS = 0,
  WARNING = 1,
  ERROR = 2
}

export interface MessageData {
  /**
   * Tipo do Toast, se é de sucesso, aviso ou erro
   */
  typeToast: TypeToast;

  /**
   * Mensagem a ser exibida no Toast
   */
  message: string;

  /**
   * Descrição mais detalhada da mensagem a ser exibida no Toast
   */
  description?: string;
}
