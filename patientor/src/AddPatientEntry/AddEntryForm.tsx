/* eslint-disable react/display-name */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { NewEntry } from '../types';
import HealthCheckForm from './HealthCheckForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalHealthcareForm from './OccupationalHealthcareForm';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const panes = [
    { menuItem: "Hospital", render: () => <Tab.Pane><HospitalEntryForm onCancel={onCancel} onSubmit={onSubmit} /></Tab.Pane> },
    { menuItem: "Health Checking", render: () => <Tab.Pane><HealthCheckForm onCancel={onCancel} onSubmit={onSubmit} /></Tab.Pane> },
    { menuItem: "Occupational Healthcare", render: () => <Tab.Pane><OccupationalHealthcareForm onCancel={onCancel} onSubmit={onSubmit} /></Tab.Pane> }
  ];

  return (
    <Tab panes={panes} />

  );
};

export default AddEntryForm;