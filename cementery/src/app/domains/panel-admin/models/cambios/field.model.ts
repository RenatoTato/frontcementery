export interface Field {
    name: string;
    label: string;
    type: string;
    options?: { value: string | number; label: string }[];
  }