export class Psychologist {
  id!: number;
  name!: string;
  age!: number;
  email!: string;
  experience!: number;
  speciality!: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.age = 0;
    this.email = '';
    this.experience = 0;
    this.speciality = '';
  }
}
