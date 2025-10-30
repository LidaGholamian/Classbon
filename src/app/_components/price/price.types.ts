import { ComponentBase } from "../types/component-base.type";

export type PriceProp = Omit<ComponentBase , 'isDisabled' | "variant" > & {
    price?: number,
    text?: string
}
