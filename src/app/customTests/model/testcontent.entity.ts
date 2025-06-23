export class Testcontent {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  points: number;

  constructor() {
    this.id = 0;
    this.question = '';
    this.options = [];
    this.correctAnswer = '';
    this.explanation = '';
    this.points = 0;
  }
}
