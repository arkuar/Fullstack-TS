import { isMatch } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { NewHospitalEntry } from '../types';

interface Props {
  onSubmit: (values: NewHospitalEntry) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const initialValues: NewHospitalEntry = {
    date: "",
    description: "",
    specialist: "",
    discharge: { date: "", criteria: "" },
    type: "Hospital",
    diagnosisCodes: []
  };

  const validateRequired = (value: string) => {
    if (!value) {
      return 'Field is required';
    }
    return null;
  };

  const validateDate = (value: string) => {
    let err;
    if (!value) {
      err = 'Field is required';
    } else if (!isMatch(value, "yyyy-MM-dd")) {
      err = 'Not a date or wrong format';
    }
    return err;
  };

  return (
    <Formik initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Header size="small">Base information</Header>
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
              validate={validateDate}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
              validate={validateRequired}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
              validate={validateRequired}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
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

export default AddEntryForm;