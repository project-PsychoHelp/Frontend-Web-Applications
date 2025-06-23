export class Career {
  name: string;
  description: string;
  compatibilityPercentage: number;

  constructor(data: Partial<Career>) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.compatibilityPercentage = data.compatibilityPercentage ?? 0;

    // Ensure compatibilityPercentage is between 0 and 100
    if (this.compatibilityPercentage < 0) this.compatibilityPercentage = 0;
    if (this.compatibilityPercentage > 100) this.compatibilityPercentage = 100;
  }

  getCompatibilityLabel(): string {
    return `${this.compatibilityPercentage}% de coincidencia`;
  }
}
