import { Supplier } from "./Supplier";

export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public supplier: Supplier
  ) {}

  updatePrice(newPrice: number): void {
    this.price = newPrice;
  }

  applyDiscount(percentage: number): void {
    this.price -= this.price * (percentage / 100);
  }
}
