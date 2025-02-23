import { Subdivision } from "./subdivision";

export interface Employee{
    id: number,
    fio: string,
    phone: string,
    date: Date,
    position: string,
    cabinet: string,
    info: string,

    subdivisionId: number,
    subdivision?: Subdivision

    helperId: number,
    helper?: Employee,

    headId: number,
    head?: Employee
}