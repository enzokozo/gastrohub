import { UserRole } from "../enum/UserRole";

export abstract class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public userRole: UserRole,
    public score: number = 0
  ) {}

  authenticate(email: string, password: string): boolean {
    return this.email === email && this.password === password;
  }

  updateProfile(name: string, email: string, password: string): void {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
