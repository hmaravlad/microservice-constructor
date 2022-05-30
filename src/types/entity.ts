export interface FieldData {
  name: string;
  type: string;
  isId?: boolean;
  possibleValues?: string[] | number[];
  references?: string[];
}

export interface EntityData {
  name: string;
  fieldName: string;
  fields: FieldData[];
}