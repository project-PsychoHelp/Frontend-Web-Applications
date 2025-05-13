export class Plan {
  planName: string;
  planId: string;
  description: string;
  price: number;
  duration: string;
  maxUsers: number;
  isActive: boolean;

  constructor() {
    this.planName = "";
    this.planId = "";
    this.description = "";
    this.price = 0;
    this.duration = "";
    this.maxUsers = 0;
    this.isActive = false;
  }
}
