export interface EmployeeData {
  id: number;
  name: string;
  department: string;
  joining_date: Date | string;
}

export interface InputEvents {
  target: {
    value?: string;
    checked?: boolean;
  };
}


export interface DepartmentCount {
  [key: string]: number;
}