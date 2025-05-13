export class Plan {
  planName: string;
  id: number;
  description: string;
  price: number;
  duration: string;
  maxUsers: number;
  isActive: boolean;

  constructor() {
    this.planName = "";
    this.id = 0;
    this.description = "";
    this.price = 0;
    this.duration = "";
    this.maxUsers = 0;
    this.isActive = false;
  }
}
