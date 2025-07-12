import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
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
  styleUrl: './select.component.css',
})
export class SelectComponent {
  /* (Optional) The text for the <label> element associated with the select dropdown. */
  label = input<string | undefined>('');

  /* (Required) The array of options to populate the select dropdown. */
  options = input.required<SelectOption[]>();

  /* (Optional) The currently selected value of the dropdown. */
  selectedValue = input<string | null>(null);

  /** 
   * An event emitter that fires whenever the user selects a new option,
   * sending the new value to the parent component.
   */
  selectionChange = output<string>();

  /**
   * Handles the change event from the select element.
   * @param event The DOM event from the select element.
   */
  onSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectionChange.emit(selectedValue);
  }
}
