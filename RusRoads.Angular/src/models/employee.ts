import { Subdivision } from "./subdivision";

export interface Employee {

    id: number,
    fio: string,
    phone: string,
    birthday: Date,

    subdivision_id: number,
    subdivision: Subdivision,
    
    position: string,
    head_id: number,
    helper_id: number,
    job_phone: string,
    email: string,
    cabinet: string
}