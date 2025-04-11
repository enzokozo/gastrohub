export class Kitchen {
    constructor(
      public id: number,
      public name: string,
      public location: string,
      public capacity: number,
      public equipment: string[],
      public score: number = 0
    ) {}
  
    checkAvailability(date: Date, time: string): boolean {
      return true; // Implement logic later
    }
  
    updateEquipment(newEquipment: string[]): void {
      this.equipment = newEquipment;
    }
  }  