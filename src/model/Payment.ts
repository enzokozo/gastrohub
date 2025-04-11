import { Booking } from "./Booking";
import { Status } from "../enum/Status";
import { PaymentMethod } from "../enum/PaymentMethod";

export class Payment {
  constructor(
    public id: number,
    public booking: Booking,
    public value: number,
    public status: Status = Status.PENDING,
    public method: PaymentMethod
  ) {}

  processPayment(): boolean {
    this.status = Status.CONFIRMED;
    return true;
  }

  refund(): void {
    this.status = Status.CANCELED;
  }
}
