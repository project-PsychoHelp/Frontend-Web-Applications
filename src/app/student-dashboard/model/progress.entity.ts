import { Test } from './test.entity';

export class Progress {
  overallPercentage: number;
  tests: Test[];

  constructor(data: Partial<Progress>) {
    this.overallPercentage = data.overallPercentage ?? 0;
    this.tests = (data.tests || []).map(test => new Test(test));

    // Ensure overallPercentage is between 0 and 100
    if (this.overallPercentage < 0) this.overallPercentage = 0;
    if (this.overallPercentage > 100) this.overallPercentage = 100;
  }

  isFullyCompleted(): boolean {
    return this.tests.every(test => test.isCompleted());
  }
}
