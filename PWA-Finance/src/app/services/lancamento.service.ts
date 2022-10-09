import { Injectable } from '@angular/core';
import { db } from '../db/finance-db';
import { Lancamento } from '../models/interfaces';
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
}
