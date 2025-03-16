export interface ErrorDetailBody{
    attr: string
    code: string
    detail: string
}

export interface ResponseErrorType {
    type: string
    errors: ErrorDetailBody[]
}