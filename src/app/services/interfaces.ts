/*
Make interfcaes / data types availble globally
*/



export interface cpdEvent {
    id : number,
    title : string,
    description: String,
    hours: number,
    startdate: string,
    endDate: string,
    eventOrganisers: string,
    CPDPoints: number,
    compentancyCat: string,
    reflection: string,
    learningPlan: string,
    certificate: string
}
