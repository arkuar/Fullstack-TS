import { Field, Form, Formik } from "formik";
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { NewEntry } from "../types";
import { validateDate, validateRating, validateRequired } from "./validators";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const HealthCheckForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const initialValues: NewEntry = {
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: [],
    type: "HealthCheck",
    healthCheckRating: 0
  };

  return (
    <Formik initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
              validate={validateDate} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              validate={validateRequired} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              validate={validateRequired} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)} />
            <Field
              label="Health check rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
              validate={validateRating}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                  </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                  </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HealthCheckForm;