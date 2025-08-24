import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import styled from 'styled-components';
import { FiCalendar, FiUsers, FiDollarSign, FiHome, FiUser, FiCoffee, FiCreditCard, FiFileText, FiClock } from 'react-icons/fi';
import { differenceInDays } from 'date-fns';

import useGuests from '../guests/useGuests';
import useCabins from '../cabins/useCabins';
import useSettings from '../settings/useSettings';
import Spinner from '../../ui/Spinner';
import Input from '../../ui/Input';
import SearchDropdown from '../../ui/SearchDropDown';
import FormRowVertical from '../../ui/FormRowVertical';
import useCreateBooking from './useCreateBooking';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import Textarea from '../../ui/Textarea';

const StyledForm = styled.form`
  background: transparent;
  border-radius: var(--border-radius-md, 8px);
  box-shadow: none;
  transform: none;

`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
  margin-top: 3.2rem;
  grid-column: 1 / -1;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  @media screen and (max-width: 600px) {
    gap: 0.8rem;
  }
`;

const Checkbox = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

export default function CreateBookingForm() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            hasBreakfast: false,
            isPaid: false,
            extrasPrice: 0
        }
    });

    const { data: cabins, isPending: isLoadingCabins } = useCabins();
    const { data: guests, isPending: isLoadingGuests } = useGuests();
    const { mutate: createBooking, isPending: isCreating } = useCreateBooking();
    const { data: settings, isPending: isLoadingSettings } = useSettings();

    const watchedValues = watch(['startDate', 'endDate', 'cabinId', 'numGuests', 'hasBreakfast']);
    // const selectedCabin = cabins?.find(cabin => cabin._id === watchedValues.cabinId);
    const [selectedCabin, setSelectedCabin] = useState(null);

    useEffect(() => {
        const [startDate, endDate, cabinId, numGuests, hasBreakfast] = watchedValues;
        const cabin = cabins?.find(cabin => cabin._id === cabinId);
        setSelectedCabin(cabin || null);
        if (startDate && endDate && cabinId) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const daysDiff = differenceInDays(end, start);
            if (daysDiff > 0) {
                setValue('numNights', daysDiff);

                const cabin = cabins.find(c => c._id === cabinId);
                if (cabin) {
                    const nightlyRate = cabin.regularPrice - (cabin.discount || 0);
                    const cabinPrice = nightlyRate * daysDiff;
                    setValue('cabinPrice', cabinPrice);

                    // Calculate extras (breakfast)
                    const extrasPrice = hasBreakfast && numGuests ? numGuests * daysDiff * 15 : 0;
                    setValue('extrasPrice', extrasPrice);
                    setValue('totalPrice', cabinPrice + extrasPrice);
                }
            }
        }
    }, [watchedValues, setValue, cabins]);

    function onSubmit(data) {
        const newBooking = {
            ...data,
            numGuests: Number(data.numGuests),
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString()
        }
        console.log(newBooking);
        createBooking(newBooking);
    }
    const today = new Date().toISOString().split("T")[0];

    if (isLoadingCabins || isLoadingGuests || isLoadingSettings) return <Spinner />
    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGrid>
                <FormRowVertical label="Start Date" error={errors.startDate?.message} icon={FiCalendar}>
                    <Input
                        type="date"
                        min={today}
                        max={watch("endDate") || ""}
                        {...register("startDate", {
                            required: "Start date is required"
                        })}
                        aria-invalid={errors.startDate ? 'true' : 'false'}
                    />
                </FormRowVertical>

                <FormRowVertical label="End Date" error={errors.endDate?.message} icon={FiCalendar}>
                    <Input
                        type="date"
                        min={watch("startDate") || today}
                        {...register("endDate", {
                            required: "End date is required"
                        })}
                        aria-invalid={errors.endDate ? 'true' : 'false'}
                    />
                </FormRowVertical>

                <FormRowVertical error={errors.cabinId?.message} icon={FiHome} fullWidth={true}>
                    <Controller
                        name="cabinId"
                        control={control}
                        rules={{ required: "Please select a cabin" }}
                        render={({ field: { onChange, value } }) => (
                            <SearchDropdown
                                options={cabins}
                                value={value}
                                onChange={onChange}
                                placeholder="Choose a cabin..."
                                searchKey="name"
                                displayKey="name"
                                error={errors.cabinId}
                            />
                        )}
                    />
                </FormRowVertical>

                <FormRowVertical fullWidth={true} error={errors.guestId?.message} icon={FiUser} >
                    <Controller
                        name="guestId"
                        control={control}
                        rules={{ required: "Please select a guest" }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <SearchDropdown
                                    options={guests}
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Choose a guest..."
                                    searchKey="fullName"
                                    displayKey="fullName"
                                    error={errors.guestId}
                                />
                            )
                        }}
                    />
                </FormRowVertical>

                <FormRowVertical label="Number of Guests" error={errors.numGuests?.message} icon={FiUsers}>
                    <Input
                        type="number"
                        min="1"
                        max={selectedCabin?.maxCapacity}
                        {...register("numGuests", {
                            required: "Number of guests is required",
                            min: { value: 1, message: "At least 1 guest required" },
                            max: { value: selectedCabin?.maxCapacity || 10, message: `Maximum ${selectedCabin?.maxCapacity || 10} guests allowed` }
                        })}
                        aria-invalid={errors.numGuests ? 'true' : 'false'}
                    />
                </FormRowVertical>

                <FormRowVertical label="Number of Nights" icon={FiClock}>
                    <Input
                        type="number"
                        {...register("numNights")}
                        disabled
                    />
                </FormRowVertical>

                <FormRowVertical label="Cabin Price" icon={FiDollarSign}>
                    <Input
                        type="number"
                        step="0.01"
                        {...register("cabinPrice")}
                        disabled
                    />
                </FormRowVertical>

                <FormRowVertical label="Extras Price" icon={FiCoffee}>
                    <Input
                        type="number"
                        step="0.01"
                        {...register("extrasPrice")}
                        disabled
                    />
                </FormRowVertical>

                <FormRowVertical label="Total Price" icon={FiDollarSign}>
                    <Input
                        type="number"
                        step="0.01"
                        {...register("totalPrice")}
                        disabled
                    />
                </FormRowVertical>

                <div></div>

                <FormRowVertical label="Payment Status" icon={FiCreditCard}>
                    <CheckboxContainer>
                        <Checkbox
                            type="checkbox"
                            id="isPaid"
                            {...register("isPaid")}
                        />
                        <CheckboxLabel htmlFor="isPaid">
                            Mark as paid
                        </CheckboxLabel>
                    </CheckboxContainer>
                </FormRowVertical>

                <FormRowVertical label="Breakfast" icon={FiCoffee}>
                    <CheckboxContainer>
                        <Checkbox
                            type="checkbox"
                            id="hasBreakfast"
                            {...register("hasBreakfast")}
                        />
                        <CheckboxLabel htmlFor="hasBreakfast">
                            (${`${settings?.breakfastPrice || 15}`}/person/night)
                        </CheckboxLabel>
                    </CheckboxContainer>
                </FormRowVertical>

                <FormRowVertical label="Observations" icon={FiFileText} fullWidth>
                    <Textarea
                        placeholder="Any special requests or notes..."
                        {...register("observations")}
                    />
                </FormRowVertical>

                <ButtonContainer>
                    <Button $variation="secondary" type="button" onClick={() => reset()}>
                        Reset Form
                    </Button>
                    <Button $variation="primary" type="submit" disabled={isCreating}>
                        {isCreating ? <SpinnerMini /> : 'Create Booking'}
                    </Button>
                </ButtonContainer>
            </FormGrid>
        </StyledForm>
    )
}
