import { Field, Form, Formik } from "formik";
import React from "react";
import { Grid, Button, Header } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { NewEntry } from "../types";
import { validateDate, validateRequired } from "./validators";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const initialValues: NewEntry = {
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: [],
    type: "Hospital",
    discharge: { date: "", criteria: "" }
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
            <Header size="small">Discharge</Header>
            <Field
              label="Date"
              placeholder="Date"
              name="discharge.date"
              component={TextField}
              validate={validateDate}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
              validate={validateRequired}
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

export default HospitalEntryForm;