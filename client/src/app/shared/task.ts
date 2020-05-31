export class Task {
    constructor(
        public _id : string,
        public task: string,
        public date: Date,
        public status: string,
        public linethrough: string,
        public label : [{
            name : string
        }]
    ) { }
}