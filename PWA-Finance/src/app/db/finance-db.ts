import Dexie, { Table } from 'dexie';

export interface GrupoContas {
  id?: number;
  sigla: string;
  title: string;
}

export interface PlanoContas {
  id?: number;
  grupoContasId: number | undefined;
  title: string;
}

export interface MeioMovimentacao {
  id?: number;
  sigla: string;
  title: string;
  entrada: boolean;
}

export interface Lancamentos {
  id?: number;
  planoContasId: number | undefined;
  data: Date;
  desc: string;
  valor: number;
  meioMovimentacaoId: number | undefined;
}

export class FinanceDB extends Dexie {
  grupoContas!: Table<GrupoContas, number>;
  planoContas!: Table<PlanoContas, number>;
  meioMovimentacao!: Table<MeioMovimentacao, number>;
  lancamentos!: Table<Lancamentos, number>;

  constructor() {
    super('Finance-DB');

    this.version(1).stores({
      grupoContas: '++id',
      planoContas: '++id, grupoContasId',
      meioMovimentacao: '++id',
    });

    this.on('populate', () => this.populate());
  }

  async populate() {
    const keysGrupo = await db.grupoContas.bulkAdd([
      { title: 'Receita', sigla: 'R' },
      { title: 'Alimentação', sigla: 'A' },
      { title: 'Moradia', sigla: 'M' },
      { title: 'Transporte', sigla: 'T' },
      { title: 'Lazer', sigla: 'L' },
      { title: 'Serviços Financeiros', sigla: 'F' },
    ], { allKeys: true });

    let ids: number = 1;

    const keysPlanContas = await db.planoContas.bulkAdd([
      { grupoContasId: ids, title: 'Salário  / Adiantamento /  Renda Autônomo' },
      { grupoContasId: ids, title: 'Férias' },
      { grupoContasId: ids, title: '13º salário' },
      { grupoContasId: ids, title: 'Aposentadoria' },
      { grupoContasId: ids, title: 'Receita extra (aluguel, restituição IR)' },
      { grupoContasId: ids++, title: 'Outras Receitas' },

      { grupoContasId: ids, title: ' Supermercado' },
      { grupoContasId: ids, title: 'Feira / Sacolão' },
      { grupoContasId: ids, title: ' Padaria' },
      { grupoContasId: ids, title: 'Refeição fora de casa' },
      { grupoContasId: ids, title: 'Outros (café, água, sorvetes, etc)' },
      { grupoContasId: ids++, title: 'Outras Receitas' },

      { grupoContasId: ids, title: 'Prestação /Aluguel de imóvel' },
      { grupoContasId: ids, title: 'Condomínio' },
      { grupoContasId: ids, title: 'Consumo de água' },
      { grupoContasId: ids, title: 'Serviço de limpeza( diarista ou mensalista)' },
      { grupoContasId: ids, title: 'Energia Elétrica' },
      { grupoContasId: ids, title: 'Gás' },
      { grupoContasId: ids, title: 'IPTU' },
      { grupoContasId: ids, title: 'Decoração da casa' },
      { grupoContasId: ids, title: 'Manutenção / Reforma da casa' },
      { grupoContasId: ids, title: 'Celular' },
      { grupoContasId: ids, title: 'Telefone fixo' },
      { grupoContasId: ids++, title: 'Internet / TV a cabo' },

      { grupoContasId: ids, title: 'Ônibus / Metrô' },
      { grupoContasId: ids, title: 'Taxi' },
      { grupoContasId: ids, title: 'Combustível' },
      { grupoContasId: ids, title: 'Estacionamento' },
      { grupoContasId: ids, title: 'Seguro Auto' },
      { grupoContasId: ids, title: 'Manutenção / Lavagem / Troca de óleo' },
      { grupoContasId: ids, title: 'Licenciamento' },
      { grupoContasId: ids, title: 'Pedágio' },
      { grupoContasId: ids++, title: 'IPVA' },

      { grupoContasId: ids, title: 'Cinema / Teatro / Shows' },
      { grupoContasId: ids, title: 'Livros / Revistas / Cd´s ' },
      { grupoContasId: ids, title: 'Clube / Parques / Casa Noturna' },
      { grupoContasId: ids, title: 'Viagens ' },
      { grupoContasId: ids++, title: 'Restaurantes / Bares / Festas' },

      { grupoContasId: ids, title: 'Empréstimos' },
      { grupoContasId: ids, title: 'Seguros (vida/residencial)' },
      { grupoContasId: ids, title: 'Investimentos(Reservas / Poupança/ Outros)' },
      { grupoContasId: ids, title: 'Juros Cheque Especial' },
      { grupoContasId: ids, title: 'Tarifas bancárias' },
      { grupoContasId: ids, title: 'Financiamento de veículo' },
      { grupoContasId: ids, title: 'Pagamento da fatura do cartão de crédito' },
      { grupoContasId: ids, title: 'Imposto de Renda a Pagar ' },
      { grupoContasId: ids, title: 'Saque' },
      { grupoContasId: ids++, title: 'Pagamento Parcela' },

    ] , { allKeys: true });

    const keysMeioMov = await db.meioMovimentacao.bulkAdd([
      { sigla: 'CC', title: 'Cartão de Crédito', entrada: false },
      { sigla: 'PC', title: 'Parcelamento no Cartão de crédit', entrada: false },
      { sigla: 'CH', title: 'Cheque', entrada: false },
      { sigla: 'DB', title: 'Debito', entrada: false },
      { sigla: 'DP', title: 'Depósito', entrada: true },
      { sigla: 'DI', title: 'Dinheiro', entrada: false },
      { sigla: 'RD', title: 'Recibo em dinheiro', entrada: true },
      { sigla: 'SQ', title: 'Saque', entrada: false },
      { sigla: 'IV', title: 'Investimento', entrada: false },

    ] , { allKeys: true });

    await db.lancamentos.bulkAdd([
      { planoContasId: 43, data: new Date(2022, 8, 1), desc: 'iof', valor: 5.83, meioMovimentacaoId: 4 },
      { planoContasId: 10, data: new Date(2022, 8, 2), desc: 'Lanche', valor: 81, meioMovimentacaoId: 4 },
      { planoContasId: 37, data: new Date(2022, 8, 2), desc: 'Hospedagem Mont Blanc', valor: 796, meioMovimentacaoId: 4 },
      { planoContasId: 7, data: new Date(2022, 8, 5), desc: 'Guanabara', valor: 766.81, meioMovimentacaoId: 4 }
    ]);

  }
}

export const db = new FinanceDB();
