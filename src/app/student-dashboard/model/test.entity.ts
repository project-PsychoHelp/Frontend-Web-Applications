export class Test {
  name: string;
  //status: 'Completado' | 'Pendiente';
  status: string;
  completionDate?: string;
  estimatedTime?: string;

  constructor(data: Partial<Test>) {
    this.name = data.name || '';
    //this.status = data.status || 'Pendiente';
    this.status = data.status || '';
    this.completionDate = data.completionDate;
    this.estimatedTime = data.estimatedTime;
  }

  isCompleted(): boolean {
    return this.status === 'Completado';
  }
}
