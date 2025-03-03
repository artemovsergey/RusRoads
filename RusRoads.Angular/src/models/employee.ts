import { Subdivision } from "./subdivision";

export interface Employee {

    id: number,
    fio: string,
    phone: string,
    birthday: Date | null,

    subdivision_id: number,
    subdivision: Subdivision | null,
    
    position: string,
    head_id: number | null,
    helper_id: number | null,
    job_phone: string,
    email: string,
    cabinet: string
    dismiss_date: Date | null
}