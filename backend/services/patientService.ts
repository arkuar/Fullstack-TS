import patientsData from '../data/patients';
import { Patient, NonSenstiviePatient, NewPatientEntry, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';

let patients: Array<Patient> = patientsData;

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

const addEntryToPatient = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
  const updatedPatient: Patient = { ...patient, entries: patient.entries.concat(newEntry) };

  patients = patients.map(p => 
    p.id === updatedPatient.id ? updatedPatient : p);

  return updatedPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntryToPatient
};