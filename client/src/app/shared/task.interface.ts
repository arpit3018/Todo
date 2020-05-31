export interface TaskI {
    task : String;
    date: Date;
    status : String;
    linethrough : String;
    label : [{
        name : String;
    }];
}