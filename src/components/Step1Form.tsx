import React, { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import * as yup from "yup";
import Step2Form from "./Step2Form";

const step1Schema = yup.object().shape({
  name: yup.string().required().min(3),
  age: yup.number().required().positive().integer(),
  sex: yup.string().required().oneOf(["Male", "Female"]),
  mobile: yup
    .string()
    .required()
    .matches(/^[6-9]\d{9}$/, "Invalid Indian Mobile Number"),
  govtIdType: yup.string().oneOf(["Aadhar", "PAN"]),
  govtId: yup.string().test({
    name: "govtId",
    message: "Invalid Government ID",
    test: function (govtId) {
      const govtIdType = this.parent.govtIdType;
      if (govtIdType === "Aadhar") {
        return !!govtId && /^[2-9]\d{11}$/.test(govtId);
      } else if (govtIdType === "PAN") {
        return !!govtId && /^[A-Za-z0-9]{10}$/.test(govtId);
      }
      return true;
    },
  }),
});

type Form1 = {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  govtIdType?: string;
  govtId?: string;
};

const Step1Form = () => {
  const [step, setStep] = useState<number>(1);
  const [resetStep, setResetStep] = useState<number>(1);
  const [formData, setFormData] = useState<Form1>({
    name: "",
    age: NaN,
    sex: "",
    mobile: "",
    govtIdType: "",
    govtId: "",
  });
  const methods = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      name: "",
      age: NaN,
      sex: "",
      mobile: "",
      govtIdType: "",
      govtId: "",
    },
  });
  if (resetStep === 2) {
    methods.reset();
    setResetStep(1);
  }

  const onSubmit: SubmitHandler<{
    name: string;
    age: number;
    sex: string;
    mobile: string;
    govtIdType?: string;
    govtId?: string;
  }> = async (data) => {
    setFormData(data);
    setStep(2);
  };

  return (
    <div>
      {step === 1 && (
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
                Personal Details
              </Typography>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    {...methods.register("name")}
                    error={Boolean(methods.formState.errors.name)}
                    helperText={methods.formState.errors.name?.message}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <TextField
                    label="Age"
                    variant="outlined"
                    fullWidth
                    type="number"
                    {...methods.register("age")}
                    error={Boolean(methods.formState.errors.age)}
                    helperText={methods.formState.errors.age?.message}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <FormControl
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel id="sex-label">Sex</InputLabel>
                    <Select
                      label="Sex"
                      {...methods.register("sex")}
                      error={Boolean(methods.formState.errors.sex)}
                      labelId="sex-label"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {methods.formState.errors.sex && (
                      <Typography
                        color="error"
                        variant="body2"
                      >
                        {methods.formState.errors.sex.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <TextField
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    {...methods.register("mobile")}
                    error={Boolean(methods.formState.errors.mobile)}
                    helperText={methods.formState.errors.mobile?.message}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  <FormControl
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel id="govtIdType-label">
                      Government ID Type
                    </InputLabel>
                    <Select
                      label="Government ID Type"
                      {...methods.register("govtIdType")}
                      error={Boolean(methods.formState.errors.govtIdType)}
                      labelId="govtIdType-label"
                    >
                      <MenuItem value="Aadhar">Aadhar</MenuItem>
                      <MenuItem value="PAN">PAN</MenuItem>
                    </Select>
                    {methods.formState.errors.govtIdType && (
                      <Typography
                        color="error"
                        variant="body2"
                      >
                        {methods.formState.errors.govtIdType.message}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                >
                  {methods.watch("govtIdType") === "Aadhar" && (
                    <TextField
                      label="Aadhar Number"
                      variant="outlined"
                      fullWidth
                      {...methods.register("govtId")}
                      error={Boolean(methods.formState.errors.govtId)}
                      helperText={methods.formState.errors.govtId?.message}
                    />
                  )}
                  {methods.watch("govtIdType") === "PAN" && (
                    <TextField
                      label="PAN Number"
                      variant="outlined"
                      fullWidth
                      {...methods.register("govtId")}
                      error={Boolean(methods.formState.errors.govtId)}
                      helperText={methods.formState.errors.govtId?.message}
                    />
                  )}
                </Grid>
              </Grid>
            </Paper>

            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              NEXT
            </Button>
          </form>
        </FormProvider>
      )}
      {step === 2 && (
        <Step2Form
          formData={formData}
          setStep={setStep}
          setResetStep={setResetStep}
        />
      )}
    </div>
  );
};

export default Step1Form;
