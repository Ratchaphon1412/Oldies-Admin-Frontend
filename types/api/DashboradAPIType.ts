export type categoryType = {
    id: number
    name: string
    code: string
    icon: string
}

export type addressType = {
    id: string
    name: string
    street: string
    city: string
    state: string
    country: string
    zip: string
    latitude: number
    longitude: number
}

export type userType = {
    account: {
        email: string
    }
    first_name: string
    last_name: string
    gender: string
    birth_date: string
}

export type priceType = {
    id?: number
    currency: string
    price: number
}

export type PackageShowListType = {
    id: string;
    name: string;
    short_description: string;
    image: string;
    category: categoryType;
    prices: priceType[];
    slug: string;
    approved: boolean;
    status: string;
}


export interface ResponseListPackagesAPIType {
    count: number;
    next: string | null;
    previous: string | null;
    results: PackageShowListType[];
}

export interface BookingShowListType {
    id: string
    package: PackageShowListType
    user: userType
    date: string | null
    time: string | null
    status: string
    address: string | null
    price: priceType
    qrcode: string | null
    qr_token: string
    cancel_reason: string | null
    is_service: boolean
}

export interface ResponseListBookingAPIType {
    count: number;
    next: string | null;
    previous: string | null;
    results: BookingShowListType[];
}

export interface FacilitatorShowListType {
    id: string;
    profile: string;
    short_description: string;
    slug: string;
    address: addressType
    name: string
    setup_status: string
    rejected_reason: string | null
    active: boolean
    account: {
        email: string
    }
}

export interface ResponseListFacilitatorAPIType {
    count: number;
    next: string | null;
    previous: string | null;
    results: FacilitatorShowListType[];
}