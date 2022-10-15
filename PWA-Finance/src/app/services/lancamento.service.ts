import { Injectable } from '@angular/core';
import { db } from '../db/finance-db';
import { Lancamento, MeioMovimentacao } from '../models/interfaces';
import { DBRepository } from '../models/db.repository';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends DBRepository<Lancamento> {
  constructor(ts: ToastService) {
    super(ts);
    this.table = db.lancamentos;
  }

  getValor(lcto: Lancamento, mv: MeioMovimentacao) : number {
    return (!mv.entrada)
      ? lcto.valor * -1
      : lcto.valor ;
  }
}
