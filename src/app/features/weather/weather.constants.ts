import { SelectOption } from "@app/shared/components/select/select.component";

/**
 * The list of selectable cities for the weather forecast,
 * including a placeholder for resetting the view.
*/
export const CITY_OPTIONS: SelectOption[] = [
  { value: '', label: 'Choose a Destination' },
  { value: 'Birmingham', label: 'Birmingham' },
  { value: 'London', label: 'London' },
  { value: 'Cardiff', label: 'Cardiff' },
];