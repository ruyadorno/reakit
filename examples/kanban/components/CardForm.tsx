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

type CardFormProps = Omit<FormHTMLProps, "onSubmit"> & {
  content: string;
  onSubmit: (content: string) => void;
};

function CardForm({ content, onSubmit, ...props }: CardFormProps) {
  const form = useFormState({
    values: {
      content
    },
    resetOnSubmitSucceed: true,
    resetOnUnmount: true,
    onValidate: values => {
      const errors = {} as Record<keyof typeof values, string>;
      if (!values.content) {
        errors.content = "Please, provide a content for the card!";
      }
      if (Object.keys(errors).length) {
        throw errors;
      }
    },
    onSubmit: values => onSubmit(values.content)
  });
  return (
    <Form {...form} {...props}>
      <FormLabel {...form} name="content">
        Content
      </FormLabel>
      <FormInput {...form} name="content" as="textarea" />
      <FormMessage {...form} name="content" />
      <FormSubmitButton {...form}>Submit</FormSubmitButton>
    </Form>
  );
}

export default CardForm;
