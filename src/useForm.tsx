import {
  DefaultValues,
  FieldValues,
  useForm as useHookForm,
} from "react-hook-form";
import React from "react";

export const useForm = <TFieldValues extends FieldValues = FieldValues>(
  defaultValues: DefaultValues<TFieldValues>
) =>
  useHookForm<TFieldValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues,
  });
