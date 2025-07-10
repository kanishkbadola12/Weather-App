import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
}

@Component({
  selector: 'nw-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})

export class SelectComponent {
  @Input() label: string = '';
  @Input() options: SelectOption[] = [];
  @Output() selectionChange = new EventEmitter<string>();

  /**
   * Handles the change event from the select element.
   * @param event The DOM event from the select element.
  */
  onSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectionChange.emit(selectedValue);
  }
}
