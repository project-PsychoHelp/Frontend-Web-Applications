export class Test {
  name: string;
  status: 'Completado' | 'Pendiente';
  completionDate?: string;
  estimatedTime?: string;

  constructor(data: Partial<Test>) {
    this.name = data.name || '';
    this.status = data.status || 'Pendiente';
    this.completionDate = data.completionDate;
    this.estimatedTime = data.estimatedTime;
  }

  isCompleted(): boolean {
    return this.status === 'Completado';
  }
}
