import { useCallback, useMemo, useState } from "react";
import { Card, CardContent, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";
import { WizardSteps } from "./wizard-steps";
import { useForm } from "react-hook-form";

export const CippWizard = (props) => {
  const { orientation = "horizontal", steps } = props;
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => (prevState > 0 ? prevState - 1 : prevState));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => (prevState < steps.length - 1 ? prevState + 1 : prevState));
  }, []);
  const formControl = useForm();
  const content = useMemo(() => {
    const StepComponent = steps[activeStep].component;
    return (
      <StepComponent
        onNextStep={handleNext}
        onPreviousStep={handleBack}
        formControl={formControl}
        options={steps[activeStep].componentProps?.options}
        title={steps[activeStep].componentProps?.title}
        subtext={steps[activeStep].componentProps?.subtext}
        valuesKey={steps[activeStep].componentProps?.valuesKey}
      />
    );
  }, [activeStep, handleNext, handleBack, steps, formControl]);

  return (
    <Card>
      {orientation === "vertical" ? (
        <CardContent>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <WizardSteps activeStep={activeStep} orientation={orientation} steps={steps} />
            </Grid>
            <Grid xs={12} md={8}>
              {content}
            </Grid>
          </Grid>
        </CardContent>
      ) : (
        <CardContent>
          <Stack spacing={6}>
            <WizardSteps activeStep={activeStep} orientation={orientation} steps={steps} />
            <div>
              <Container maxWidth="sm">{content}</Container>
            </div>
          </Stack>
        </CardContent>
      )}
    </Card>
  );
};