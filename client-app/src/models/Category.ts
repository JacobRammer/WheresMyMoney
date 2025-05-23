export class Category {
    id: string;
    title: string;
    target: number;
    outflow: number;
    assigned: number;
    categoryGroupId: string;
    available: number;


    constructor(id: string, name: string, categoryGroupId: string, assigned: number = 0, target: number = 0, outflow: number = 0) {
        this.id = id;
        this.title = name;
        this.assigned = assigned;
        this.target = target;
        this.outflow = outflow;
        this.categoryGroupId = categoryGroupId;
        this.available = this.availableBalance();
    }

    private availableBalance(): number {
        return this.assigned - this.outflow;
    }
}