export class Payee {
    id: string;
    payeeName: string;

    constructor(id: string, title: string = '') {
        this.id = id;
        this.payeeName = title;
    }
}