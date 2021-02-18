import patientsData from '../data/patients.json';
import { Patient, NonSenstiviePatient, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getNonSensitiveEntries = (): NonSenstiviePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id: id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};