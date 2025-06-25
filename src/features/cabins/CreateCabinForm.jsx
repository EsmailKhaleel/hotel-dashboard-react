import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormRow } from "../../ui/FormRow";
import { useState } from "react";
import { useCabinMutation } from "./useCabinMutation";


function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { _id: cabinId, ...cabin } = cabinToEdit;
  const isEditingSession = Boolean(cabinId);

  const [imagePreview, setImagePreview] = useState(cabin.image || "");

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingSession ? cabin : {}
  });

  const { errors } = formState;

  const { mutate, isPending } = useCabinMutation(isEditingSession, cabinId);

  const onSubmit = (data) => {
    if (isEditingSession) {
      // Editing
      mutate({ data, existingImageUrl: cabin.image }, {
        onSuccess: () => {
          onCloseModal?.();
        }
      });
    } else {
      // Creating
      mutate({ data }, {
        onSuccess: () => {
          reset();
          setImagePreview("");
          onCloseModal?.();
        }
      });
    }
  };


  const handleImageChange = (e) => {
    setImagePreview("");
    const file = e.currentTarget.files[0];
    if (file && !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "default"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input id="name" {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Name must be at least 3 characters" }
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={1}
          {...register("maxCapacity", {
            required: "Capacity is required",
            min: { value: 1, message: "Capacity must be at least 1" },
            max: { value: 20, message: "Capacity cannot exceed 20" }
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message} >
        <Input
          type="number"
          id="regularPrice"
          defaultValue={99}
          {...register("regularPrice", {
            required: "Price is required",
            min: { value: 1, message: "Price must be at least 1" }
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: value => {
              const regularPrice = parseFloat(getValues("regularPrice"));
              const discount = parseFloat(value);
              if (discount < 0) return "Discount cannot be negative";
              if (discount >= regularPrice) return "Discount must be less than regular price";
              return true;
            }
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          rows={3}
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "Description must be at least 10 characters" }
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingSession ? false : "Image is required",
            onChange: handleImageChange,
          })}
        />
      </FormRow>
      {imagePreview && (
        <FormRow>
          <p>Cabin photo preview:</p>

          <img
            src={imagePreview}
            alt="Cabin preview"
            style={{ width: "100px", height: "auto", objectFit: "cover" }}
          />
        </FormRow>
      )}

      <FormRow>
        <Button $variation="secondary" type="reset"
          onClick={() =>
            onCloseModal?.()
          }>
          Cancel
        </Button>
        <Button disabled={isPending} $variation="primary" type="submit">
          {isEditingSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
