import { User } from "./User";
import { UserRole } from "../enum/UserRole";
import { Booking } from "./Booking";

export class Chef extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    score: number,
    public cnpj: string,
    public bookingList: Booking[] = []
  ) {
    super(id, name, email, password, UserRole.CHEF, score);
  }

  bookKitchen(): void {
    // Implement logic
  }

  viewReports(): void {
    // Implement logic
  }
}
