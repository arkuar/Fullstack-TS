import patientsData from '../data/patients';
import { Patient, NonSenstiviePatient, NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

const getNonSensitiveEntries = (): NonSenstiviePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatient: Patient = {
    id: id,
    entries: [],
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);

};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById
};