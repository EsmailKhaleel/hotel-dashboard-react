import Form from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import Spinner from '../../ui/Spinner';
import ErrorFallback from '../../ui/ErrorFallback';
import useUpdateSettings from './useUpdateSettings';
import useResetSettings from './useResetSettings';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';

function UpdateSettingsForm() {
  const { data: settings, isPending: isLoadingSettings, error: errorFetchingSettings } = useSettings();
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings || {};

  const { mutate: updateSettings, isPending: isUpdatingSetting } = useUpdateSettings();
  const { mutate: resetSettings, isPending: isResetting } = useResetSettings();


  if (isLoadingSettings) {
    return <Spinner />;
  }

  if (errorFetchingSettings) {
    return <ErrorFallback error={errorFetchingSettings} />;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    updateSettings({ [id]: value });
  };

  const handleResetSettings = (e) => {
    e.preventDefault();
    resetSettings();
  }



  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='minBookingLength'
          defaultValue={minBookingLength || ""}
          onBlur={handleChange}
          disabled={isUpdatingSetting}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='maxBookingLength'
          defaultValue={maxBookingLength || ""}
          onBlur={handleChange}
          disabled={isUpdatingSetting}
        />
      </FormRow>

      <FormRow label='Maximum guests per booking'>
        <Input
          type='number'
          id='maxGuestsPerBooking'
          defaultValue={maxGuestsPerBooking || ""}
          onBlur={handleChange}
          disabled={isUpdatingSetting}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfastPrice'
          defaultValue={breakfastPrice || ""}
          onBlur={handleChange}
          disabled={isUpdatingSetting}
        />
      </FormRow>

      <FormRow>
          <Button
            $variant="secondary"
            $size="medium"
            onClick={handleResetSettings}
            disabled={isResetting || isUpdatingSetting}

          >
            {isResetting ? <SpinnerMini />: "Reset"}
          </Button>
      </FormRow>

    </Form>

  );
}

export default UpdateSettingsForm;
