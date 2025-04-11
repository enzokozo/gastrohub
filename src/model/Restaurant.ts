import { User } from "./User";
import { UserRole } from "../enum/UserRole";
import { Kitchen } from "./Kitchen";

export class Restaurant extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    score: number,
    public cnpj: string,
    public availableKitchens: Kitchen[] = []
  ) {
    super(id, name, email, password, UserRole.RESTAURANT, score);
  }

  registerKitchen(): void {
    // Implement logic
  }

  manageReservations(): void {
    // Implement logic
  }
}
