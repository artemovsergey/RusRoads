import { Subdivision } from "./subdivision";

export interface Employee {

    id: number,
    fio: string,
    phone: string,
    birthday: Date,

    subdivision_id: number,
    subdivision: Subdivision,
    
    position: string,
    head_id: number | null,
    helper_id: number | null,
    job_phone: string,
    email: string,
    cabinet: string
    dismiss_date: Date | null
}