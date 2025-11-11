import { Accordion } from "./accordion";

export type Tab = {
    label: string;
    content: string | React.ReactNode;
    type?: "string" | "faq";
    faqData?: Accordion[];
}
