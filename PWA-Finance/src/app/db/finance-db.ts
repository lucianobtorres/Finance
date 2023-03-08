import Dexie, { Table } from 'dexie';
import { GrupoContas, PlanoContas, MeioMovimentacao, Lancamento } from '../models/interfaces';

export interface IHistoricoCompras {
  id?: number;
  comprado: boolean;
  item: string;
  data: string;
}


export class FinanceDB extends Dexie {
  grupoContas!: Table<GrupoContas, number>;
  planoContas!: Table<PlanoContas, number>;
  meioMovimentacao!: Table<MeioMovimentacao, number>;
  lancamentos!: Table<Lancamento, number>;

  //historicoCompras!: Table<IHistoricoCompras, number>;

  constructor() {
    super('Finance-DB');

    this.version(1).stores({
      grupoContas: '++id',
      planoContas: '++id, grupoContasId',
      meioMovimentacao: '++id',
      lancamentos: '++id, planoContasId, meioMovimentacaoId',
      //historicoCompras: '++id, compra, produto, data',
    });

    this.on('populate', () => this.populate());
  }

  async populate() {
    const keysGrupo = await db.grupoContas.bulkAdd([
      { title: 'Receita', icone: 'attach_money' },
      { title: 'Alimentação', icone: 'restaurant' },
      { title: 'Moradia', icone: 'home_work' },
      { title: 'Transporte', icone: 'commute' },
      { title: 'Lazer', icone: 'sports_soccer' },
      { title: 'Serviços Financeiros', icone: 'receipt' },
    ], { allKeys: true });

    let ids: number = 1;

    const keysPlanContas = await db.planoContas.bulkAdd([
      { grupoContasId: ids, title: 'Salário  / Adiantamento /  Autônomo' },
      { grupoContasId: ids, title: 'Férias' },
      { grupoContasId: ids, title: '13º salário' },
      { grupoContasId: ids, title: 'Aposentadoria' },
      { grupoContasId: ids, title: 'Receita extra (aluguel, restituição IR)' },
      { grupoContasId: ids++, title: 'Outras Receitas' },

      { grupoContasId: ids, title: ' Supermercado' },
      { grupoContasId: ids, title: 'Feira / Sacolão' },
      { grupoContasId: ids, title: ' Padaria' },
      { grupoContasId: ids, title: 'Refeição fora de casa' },
      { grupoContasId: ids, title: 'Lanche' },
      { grupoContasId: ids++, title: 'Outros (café, água, sorvetes, etc)' },

      { grupoContasId: ids, title: 'Prestação / Aluguel de imóvel' },
      { grupoContasId: ids, title: 'Condomínio' },
      { grupoContasId: ids, title: 'Consumo de água' },
      { grupoContasId: ids, title: 'Serviço de limpeza( diarista ou mensalista)' },
      { grupoContasId: ids, title: 'Energia Elétrica' },
      { grupoContasId: ids, title: 'Gás' },
      { grupoContasId: ids, title: 'IPTU' },
      { grupoContasId: ids, title: 'Decoração da casa' },
      { grupoContasId: ids, title: 'Manutenção / Reforma' },
      { grupoContasId: ids, title: 'Celular' },
      { grupoContasId: ids, title: 'Telefone fixo' },
      { grupoContasId: ids++, title: 'Internet / TV a cabo' },

      { grupoContasId: ids, title: 'Ônibus / Metrô' },
      { grupoContasId: ids, title: 'Taxi / Uber / 99' },
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
      { grupoContasId: ids, title: 'Viagens' },
      { grupoContasId: ids++, title: 'Restaurantes / Bares / Festas' },

      { grupoContasId: ids, title: 'Empréstimos' },
      { grupoContasId: ids, title: 'Seguros (vida / residencial)' },
      { grupoContasId: ids, title: 'Investimentos(Reservas / Poupança / Outros)' },
      { grupoContasId: ids, title: 'Juros Cheque Especial' },
      { grupoContasId: ids, title: 'Tarifas bancárias' },
      { grupoContasId: ids, title: 'Financiamento de veículo' },
      { grupoContasId: ids, title: 'Pagamento da fatura cartão de crédito' },
      { grupoContasId: ids, title: 'Imposto de Renda a Pagar ' },
      { grupoContasId: ids, title: 'Saque' },
      { grupoContasId: ids, title: 'Pagamento Parcela' },
      { grupoContasId: ids++, title: 'Pagamento Boleto' },

    ], { allKeys: true });

    const keysMeioMov = await db.meioMovimentacao.bulkAdd([
      { sigla: 'CC', title: 'Cartão de Crédito', entrada: false },
      { sigla: 'DB', title: 'Debito', entrada: false },
      { sigla: 'DI', title: 'Dinheiro', entrada: false },
      { sigla: 'DP', title: 'Depósito', entrada: true },
      { sigla: 'RD', title: 'Recibo em dinheiro', entrada: true },
      { sigla: 'CH', title: 'Cheque', entrada: false },
      { sigla: 'SQ', title: 'Saque', entrada: false },
      { sigla: 'IV', title: 'Investimento', entrada: false },

    ], { allKeys: true });
  }
}

export const db = new FinanceDB();
