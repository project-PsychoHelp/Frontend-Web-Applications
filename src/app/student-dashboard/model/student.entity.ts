import { Progress } from './progress.entity';
import {Career} from './career.entity';


export class Student {
  id: number;
  fullName: string;
  userType: string;
  progress: Progress;
  recommendedCareers: Career[];

  constructor(data: Partial<Student>) {
    this.id = data.id ?? 0;
    this.fullName = data.fullName || '';
    this.userType = data.userType ?? 'No type';
    this.progress = new Progress(data.progress || {});
    this.recommendedCareers = (data.recommendedCareers || []).map(career => new Career(career));
  }

  getDisplayName(): string {
    return this.fullName;
  }
}
