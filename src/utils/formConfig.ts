export interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "select" | "checkbox" | "email";
  options?: { label: string; value: string }[];
  validation: Record<string, any>;
}

const formConfig: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your full name",
    validation: { required: "Enter your full name" },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        message: "Please enter a valid email address.",
      },
    },
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    validation: {
      required: "Age is required",
      min: { value: 18, message: "Age must be between 18 and 100." },
      max: { value: 100, message: "Age must be between 18 and 100." },
    },
  },
  {
    name: "newsletter",
    label: "Newsletter Subscription",
    type: "checkbox",
    validation: {},
  },
];

export default formConfig;
