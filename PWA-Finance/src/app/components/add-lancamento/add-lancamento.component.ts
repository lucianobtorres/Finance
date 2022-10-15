import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatChip, MatChipList } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { GrupoContas, MeioMovimentacao, PlanoContas } from 'src/app/models/interfaces';


interface FormAdd {
  planConta: FormControl<PlanoContas | null | undefined>;
  meioMov: FormControl<MeioMovimentacao | null | undefined>;
  desc: FormControl<string | null | undefined>;
  data: FormControl<Date | null | undefined>;
  valor: FormControl<number | null | undefined>;
  vezes: FormControl<number | null | undefined>;
}

@Component({
  selector: 'fi-add-lancamento',
  templateUrl: './add-lancamento.component.html',
  styleUrls: ['./add-lancamento.component.scss']
})
export class AddLancamentoComponent implements OnInit, AfterViewInit, OnDestroy {
  public today = new Date();
  public formAdd!: FormGroup<FormAdd>;
  public planosConta: PlanoContas[];
  public meiosMovs: MeioMovimentacao[];

  @ViewChild('chipList') private matChipList!: MatChipList;
  private sub?: Subscription;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AddLancamentoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:
      {
        gruposConta: GrupoContas[],
        planosConta: PlanoContas[],
        meiosMovimentacao: MeioMovimentacao[]
      }) {
    this.planosConta = data.planosConta;
    this.meiosMovs = data.meiosMovimentacao;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (!this.matChipList) return;

    this.sub = this.matChipList.chipSelectionChanges.subscribe(() => {
      const grupos: GrupoContas[] = [];
      if (this.matChipList.selected instanceof Array) {
        for (const item of this.matChipList.selected) {
          grupos.push(item.value)
        }

        if (grupos.length < 1) {
          this.planosConta = this.data.planosConta;
          return;
        }

        this.planosConta = this.data.planosConta.filter(x => grupos.some(y => y.id === x.grupoContasId));
      };
    });
  }

  ngOnInit(): void {
    this.formAdd = new FormGroup({
      data: new FormControl<Date | null | undefined>(new Date(), Validators.required),
      valor: new FormControl<number | null | undefined>(null, Validators.required),
      planConta: new FormControl<PlanoContas | null | undefined>(null, Validators.required),
      desc: new FormControl<string | null | undefined>(null),
      meioMov: new FormControl<MeioMovimentacao | null | undefined>(null, Validators.required),
      vezes: new FormControl<number | null | undefined>(1),
    });
  }

  avaliarMeioMov() {
    if (this.formAdd.controls.planConta.value?.grupoContasId == 1) {
      this.meiosMovs = this.data.meiosMovimentacao.filter(x => x.entrada);
    }
    else {
      this.meiosMovs = this.data.meiosMovimentacao;
    }
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
      meioMovimentacaoId: value.meioMov.id,
      vezes: value.meioMov.id === this.data.meiosMovimentacao[0].id ? value.vezes : 1
    });
  }

  cancelar() {
    this._bottomSheetRef.dismiss();
  }
}
