import { User } from "./User";
import { UserRole } from "../enum/UserRole";
import { Product } from "./Product";

export class Supplier extends User {
  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    score: number,
    public productList: Product[] = []
  ) {
    super(id, name, email, password, UserRole.SUPPLIER, score);
  }

  registerProduct(): void {
    // Implement logic
  }

  sellProduct(): void {
    // Implement logic
  }
}
