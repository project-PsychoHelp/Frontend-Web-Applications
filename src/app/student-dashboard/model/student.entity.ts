import { Progress } from './progress.entity';
import {Career} from './career.entity';


export class Student {
  id: number;
  fullName: string;
  userType: 'estudiante';
  progress: Progress;
  recommendedCareers: Career[];

  constructor(data: Partial<Student>) {
    this.id = data.id ?? 0;
    this.fullName = data.fullName || '';
    this.userType = 'estudiante'; // Always estudiante as per your requirement
    this.progress = new Progress(data.progress || {});
    this.recommendedCareers = data.recommendedCareers || [];
  }

  getDisplayName(): string {
    return this.fullName;
  }
}
