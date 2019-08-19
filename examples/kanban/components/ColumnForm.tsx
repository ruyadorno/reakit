import * as React from "react";
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton,
  unstable_FormHTMLProps as FormHTMLProps
} from "reakit";

type ColumnFormProps = Omit<FormHTMLProps, "onSubmit"> & {
  title: string;
  onSubmit: (title: string) => void;
};

function ColumnForm({ title, onSubmit, ...props }: ColumnFormProps) {
  const form = useFormState({
    values: {
      title
    },
    resetOnSubmitSucceed: true,
    resetOnUnmount: true,
    onValidate: values => {
      const errors = {} as Record<keyof typeof values, string>;
      if (!values.title) {
        errors.title = "Please, provide a title for the column!";
      }
      if (Object.keys(errors).length) {
        throw errors;
      }
    },
    onSubmit: values => onSubmit(values.title)
  });
  return (
    <Form {...form} {...props}>
      <FormLabel {...form} name="title">
        Title
      </FormLabel>
      <FormInput {...form} name="title" />
      <FormMessage {...form} name="title" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}

export default ColumnForm;
