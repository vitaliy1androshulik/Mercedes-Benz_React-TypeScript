export interface MercedesModel {
    id: number;
    title: string;
    quantity: number;
    price: number;
    discount: number;
    imageUrl: string;
    description?: string;
    classId: number;
    className?: string;
}

export type MercedesFormField = {
    id: number;
    title: string;
    quantity: number;
    price: number;
    discount: number;
    imageUrl: string;
    description?: string;
    classId: number;
};

export interface ClassModel {
    id: number;
    name: string;
}

export interface ClassOption {
    value: number;
    label: string;
}