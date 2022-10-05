import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MeioMovimentacao, PlanoContas } from 'src/app/models/interfaces';


interface FormAdd {
  planConta: FormControl<PlanoContas | null | undefined>;
  meioMov: FormControl<MeioMovimentacao | null | undefined>;
  desc: FormControl<string | null | undefined>;
  data: FormControl<Date | null | undefined>;
  valor: FormControl<number | null | undefined>;
}

@Component({
  selector: 'fi-add-lancamento',
  templateUrl: './add-lancamento.component.html',
  styleUrls: ['./add-lancamento.component.scss']
})
export class AddLancamentoComponent implements OnInit {
  public formAdd!: FormGroup<FormAdd>;
  public planosConta?: PlanoContas[];
  public meiosMovimentacao?: MeioMovimentacao[];

  constructor(
    private fb: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<AddLancamentoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:
      {
        planosConta: PlanoContas[],
        meiosMovimentacao: MeioMovimentacao[]
      }) { }

  ngOnInit(): void {

    this.formAdd = new FormGroup({
      planConta: new FormControl<PlanoContas | null | undefined>(null, Validators.required),
      meioMov: new FormControl<MeioMovimentacao | null | undefined>(null, Validators.required),
      desc: new FormControl<string | null | undefined>(null),
      data: new FormControl<Date | null | undefined>(null, Validators.required),
      valor: new FormControl<number | null | undefined>(null, Validators.required),
    });
  }

  salvar() {
    if (this.formAdd.invalid) {
      this.formAdd.markAllAsTouched();
      return;
    }

    const value = this.formAdd.value;
    if (
      !value.data ||
      !value.valor ||
      !value.planConta ||
      !value.meioMov
    ) {
      return;
    }

    this._bottomSheetRef.dismiss({
      planoContasId: value.planConta.id,
      data: value.data,
      desc: value.desc,
      valor: Number(value.valor),
      meioMovimentacaoId: value.meioMov.id
    });
  }
}
