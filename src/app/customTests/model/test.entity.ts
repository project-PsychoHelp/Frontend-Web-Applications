export class Test {
  title: string;
  id: number;
  description: string;
  category: string;
  recommendationPercentage: number;
  numberOfQuestions: number;
  isFree: boolean;

  constructor() {
    this.title = "";
    this.id = 0;
    this.description = "";
    this.category = "";
    this.recommendationPercentage = 0;
    this.numberOfQuestions = 0;
    this.isFree = false;
  }
}
