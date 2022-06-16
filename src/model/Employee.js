export default class Employee {
    constructor(emp = {
        id : "",
        name : "",
        salary : ""
    }) {
        this.id = emp.id;
        this.name = emp.name;
        this.salary = emp.salary;
    }
};