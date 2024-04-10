export interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    name: string;
}

export interface TextAreaProps {
    label: string;
    name: string;
}

export interface OptionType {
    title: string;
    value: string;
}

export interface SelectProps {
    options: OptionType[];
    label: string;
    name: string;
}

export interface CreateFormElementType {
    element: string;
    placeholder?: string;
    label: string;
    name: string;
    type?: string;
    options?: OptionType[];
}