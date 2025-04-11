import { User } from "./User";
import { Kitchen } from "./Kitchen";

export class Review {
  constructor(
    public id: number,
    public rating: number,
    public comment: string,
    public user: User,
    public kitchen: Kitchen
  ) {}

  registerReview(): void {
    // Implement logic
  }

  calculateScore(): number {
    return this.rating; // Implement calculation logic
  }
}