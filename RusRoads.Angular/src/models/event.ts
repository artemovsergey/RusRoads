export interface Event{

    id: number,
    event_type_id: number | null,
    employee_id: number
    begin_date: Date | null,
    end_date: Date | null,
    description?: string

}