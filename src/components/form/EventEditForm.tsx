import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useWatch, Controller } from "react-hook-form";
import Input from "../input/Input";
import { Importance, importanceValues } from "../../api/event";
import Select from "../select/Select";

type Props = {
  initValues?: EventFormData;
  onSubmit: SubmitHandler<EventFormData>;
  onCancel: () => void;
  submitText: string;
  serverErrorMessage?: string;
};

export type EventFormData = {
  id?: string;
  name: string;
  description: string;
  date: string;
  importance: Importance;
};

const EventEditForm: React.FC<Props> = ({
  initValues,
  onSubmit,
  onCancel,
  serverErrorMessage,
  submitText,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<EventFormData>({
    mode: "onSubmit",
    defaultValues: initValues,
  });

  useEffect(() => {
    setError("root", {
      message: serverErrorMessage,
    });
  }, [serverErrorMessage, setError]);

  const formValues = useWatch({ control });

  useEffect(() => {
    if (errors.root?.message) {
      clearErrors("root");
    }
  }, [formValues, errors, clearErrors]);

  const [selectedImportance, setSelectedImportance] = useState<Importance>(
    initValues?.importance || Importance.СOMMON
  );

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="Name"
          id="name"
          placeholder="Name"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        {errors.name && (
          <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Controller
          control={control}
          defaultValue={selectedImportance}
          name="importance"
          render={({ field: { onChange } }) => (
            <Select
              label="Importance"
              selected={importanceValues[selectedImportance]}
              setSelected={(e) => {
                onChange(e);
                setSelectedImportance(e);
              }}
              items={Object.entries(importanceValues)
                .filter(([name]) => name !== Importance.ANY)
                .map(([name, label], index) => ({
                  id: index,
                  name,
                  label,
                }))}
            />
          )}
        />
        {errors.importance && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.importance.message}
          </p>
        )}
      </div>

      <div>
        <Input
          label="Description"
          id="description"
          placeholder="Description"
          {...register("description", {
            required: {
              value: true,
              message: "Description is required",
            },
          })}
        />
        {errors.description && (
          <p className="text-red-600 mt-1 text-sm">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <Input
          label="Date"
          id="date"
          placeholder="Date"
          {...register("date", {
            required: {
              value: true,
              message: "Date is required",
            },
          })}
        />
        {errors.date && (
          <p className="text-red-600 mt-1 text-sm">{errors.date.message}</p>
        )}
      </div>
      {errors.root && (
        <p className="text-red-600 mt-1 text-sm">{errors.root.message}</p>
      )}

      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="cursor-pointer inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto bg-blue-600 hover:bg-blue-500"
        >
          {submitText || "Submit"}
        </button>
        <button
          type="button"
          data-autofocus
          onClick={onCancel}
          className="cursor-pointer mt-3 max-sm:mb-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto sm:ml-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventEditForm;
