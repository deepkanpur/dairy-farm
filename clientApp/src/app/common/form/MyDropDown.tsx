import { useField } from "formik";
import { Form, Label, Dropdown } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    options: {text: string, value: string}[];
    label?: string;
}

export default function MySelectDropDown(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Dropdown 
                fluid
                search
                selection
                placeholder={props.placeholder}
                options={props.options}
                value={field.value || null}
                onChange={(_, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}