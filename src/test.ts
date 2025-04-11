import { Chef } from "./model/Chef";
import { Kitchen } from "./model/Kitchen";

const entrepreneur = new Chef(1, "John Doe", "john@example.com", "1234", 3.5 ,"00.000.000/0001-00");
const kitchen = new Kitchen(1, "Gourmet Space", "Downtown", 5, ["Oven", "Fridge"]);

console.log(entrepreneur);
console.log(kitchen);
