import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addUser } from "../store/reducer/useReducer";
import * as yup from "yup";
import axios from "axios";

const step2Schema = yup.object().shape({
  address: yup.string(),
  state: yup.string(),
  city: yup.string(),
  country: yup
    .string()
    .test("valid-country", "Invalid Country", async (value) => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${value}`
        );
        return response.data.length > 0;
      } catch (error) {
        return false;
      }
    }),
  pincode: yup.string().matches(/^\d+$/, "Invalid Pincode"),
});

const Step2Form = ({
  formData,
  setStep,
  setResetStep,
}: {
  formData: {
    name: string;
    age: number;
    sex: string;
    mobile: string;
    govtIdType?: string;
    govtId?: string;
  };
  setStep: (data: number) => void;
  setResetStep: (data: number) => void;
}) => {

  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(step2Schema),
    defaultValues: {
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
  });

  const onSubmit: SubmitHandler<{
    address?: string;
    state?: string;
    city?: string;
    country?: string;
    pincode?: string;
  }> = async (data) => {
    const completeData = {
      address: data.address!,
      state: data.state!,
      city: data.city!,
      country: data.country!,
      pincode: data.pincode!,
    };

    
    const mergedData = { ...formData, ...completeData };
    
    dispatch(addUser(mergedData));
    methods.reset();
    setResetStep(2);
    setStep(1);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Paper
          elevation={3}
          style={{ padding: "20px", marginBottom: "20px" }}
        >
          <Typography
            variant="h4"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            Address Details
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                {...methods.register("address")}
                error={Boolean(methods.formState.errors.address)}
                helperText={methods.formState.errors.address?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                {...methods.register("state")}
                error={Boolean(methods.formState.errors.state)}
                helperText={methods.formState.errors.state?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                {...methods.register("city")}
                error={Boolean(methods.formState.errors.city)}
                helperText={methods.formState.errors.city?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                label="Country"
                variant="outlined"
                fullWidth
                {...methods.register("country")}
                error={Boolean(methods.formState.errors.country)}
                helperText={methods.formState.errors.country?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                label="Pincode"
                variant="outlined"
                fullWidth
                {...methods.register("pincode")}
                error={Boolean(methods.formState.errors.pincode)}
                helperText={methods.formState.errors.pincode?.message}
              />
            </Grid>
          </Grid>
        </Paper>

        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          SUBMIT
        </Button>
      </form>
    </FormProvider>
  );
};

export default Step2Form;
