import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fi-item-config',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() public disabled?: boolean;
  @Input() public url?: string;
  @Input() public text?: string;
  @Input() public icon?: string;

  @Output() public itemMenuClick = new EventEmitter();
}
