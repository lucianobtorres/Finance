import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';


@Component({
  selector: 'fi-edit-grupo-lancamento',
  templateUrl: './edit-grupo-lancamento.component.html',
  styleUrls: ['./edit-grupo-lancamento.component.scss']
})
export class EditGrupoLancamentoComponent {
  public filmes = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  drop(ev: any): void {
    const event = (<CdkDragDrop<string[]>><unknown>ev);
    moveItemInArray(this.filmes, event.previousIndex, event.currentIndex);
  }
}
