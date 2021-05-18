export interface IVaccineCenter {
    address: string;
    block_name: string;
    center_id: number
    district_name: string;
    fee_type: string;
    from: string;
    lat: number
    long: number
    name: string;
    pincode: number
    sessions: ISession[];
    state_name: string;
    to: string;
}
export interface ISession {
    available_capacity: number;
    available_capacity_dose1: number;
    available_capacity_dose2: number;
    date: string;
    min_age_limit: number;
    session_id: string;
    slots: string[];
    vaccine: string;
}