import { Kitchen } from "./Kitchen";
import { User } from "./User";
import { Status } from "../enum/Status";

export class Booking {
    constructor(
      public id: number,
      public kitchen: Kitchen,
      public user: User,
      public date: Date,
      public startTime: Date,
      public endTime: Date,
      public status: Status = Status.PENDING
    ) {}
  
    confirm(): void {
      this.status = Status.CONFIRMED;
    }
  
    cancel(): void {
      this.status = Status.CANCELED;
    }
  }