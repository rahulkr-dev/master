import { CreateFormElementType, InputProps, SelectProps, TextAreaProps } from "./type";


const Input = ({ label, type, placeholder, name }: InputProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type={type} placeholder={placeholder} name={name} />
        </div>
    );
};

const TextArea = ({ label, name }: TextAreaProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <textarea name={name}></textarea>
        </div>
    );
};

const Select = ({ options, label, name }: SelectProps) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <select name={name}>
                {options.map(({ title, value }) => (
                    <option value={value} key={value}>{title}</option>
                ))}
            </select>
        </div>
    );
};



const createFormElement = ({ element, placeholder, label, name, type, options }: CreateFormElementType) => {
    switch (element) {
        case "input":
            return <Input label={label} name={name} placeholder={placeholder || ""} type={type || "text"} />;
        case "textarea":
            return <TextArea label={label} name={name} />;
        case "select":
            if (!options || options.length === 0) {
                throw new Error("Options must be provided for select element.");
            }
            return <Select label={label} name={name} options={options} />;
        default:
            throw new Error(`Unsupported element type: ${element}`);
    }
};

export const FactoryPattern = () => {
    const formElements: CreateFormElementType[] = [
        {
            element: "input",
            label: "Name",
            name: "name",
            placeholder: "Enter your name",
            type: "text",
        },
        {
            element: "textarea",
            label: "Message",
            name: "message",
        },
        {
            element: "select",
            label: "Country",
            name: "country",
            options: [
                { title: "USA", value: "usa" },
                { title: "Canada", value: "canada" },
                { title: "UK", value: "uk" },
            ],
        },
    ];

    return (
        <div>
            {formElements.map((element, index) => (
                <div key={index}>
                    {createFormElement(element)}
                </div>
            ))}
        </div>
    );
};
