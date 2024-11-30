import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useForm,
  Controller,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { FormField } from "../../utils/formConfig";
import { AppDispatch, RootState } from "../../redux/store";
import { updateFormData } from "../../redux/formSlice";
import useSendData from "hooks/useSendData";

interface DynamicFormProps {
  formConfig: FormField[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formConfig }) => {
  const { mutateAsync: sendData, isPending } = useSendData();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.form.formData);

  useEffect(() => {
    formConfig.forEach((field) => {
      if (formData[field.name]) {
        setValue(field.name, formData[field.name]);
      }
    });
  }, [formConfig, formData, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      dispatch(updateFormData(data));
      const response = await sendData(data);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const renderField = (fieldData: FormField) => {
    switch (fieldData.type) {
      case "text":
      case "email":
        return (
          <div className="mb-4" key={fieldData.name}>
            <label className="block text-sm font-medium text-gray-700">
              {fieldData.label}
            </label>
            <Controller
              name={fieldData.name}
              control={control}
              defaultValue=""
              rules={fieldData.validation}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder={fieldData.placeholder}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              )}
            />
            {errors[fieldData.name] && (
              <span className="text-red-500 text-sm">
                {errors[fieldData.name]?.message?.toString()}
              </span>
            )}
          </div>
        );

      case "number":
        return (
          <div className="mb-4" key={fieldData.name}>
            <label className="block text-sm font-medium text-gray-700">
              {fieldData.label}
            </label>
            <Controller
              name={fieldData.name}
              control={control}
              defaultValue=""
              rules={fieldData.validation}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder={fieldData.placeholder}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              )}
            />
            {errors[fieldData.name] && (
              <span className="text-red-500 text-sm">
                {errors[fieldData.name]?.message?.toString()}
              </span>
            )}
          </div>
        );

      case "select":
        return (
          <div className="mb-4" key={fieldData.name}>
            <label className="block text-sm font-medium text-gray-700">
              {fieldData.label}
            </label>
            <Controller
              name={fieldData.name}
              control={control}
              defaultValue=""
              rules={fieldData.validation}
              render={({ field }) => (
                <select
                  {...field}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  {fieldData?.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors[fieldData.name] && (
              <span className="text-red-500 text-sm">
                {errors[fieldData.name]?.message?.toString()}
              </span>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="mb-4" key={fieldData.name}>
            <label className="inline-flex items-center">
              <Controller
                name={fieldData.name}
                control={control}
                render={({ field }) => (
                  <input {...field} type="checkbox" className="form-checkbox" />
                )}
              />
              <span className="ml-2">{fieldData.label}</span>
            </label>
            {errors[fieldData.name] && (
              <span className="text-red-500 text-sm">
                {errors[fieldData.name]?.message?.toString()}
              </span>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
      {formConfig.map((field) => renderField(field))}
      {isPending ? (
        <div className="w-full flex justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      )}
    </form>
  );
};

export default DynamicForm;
