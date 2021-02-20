/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, NewEntry, EntryType, NewBaseEntry, Diagnosis, HealthCheckRating } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Missing or incorrect name: ${name}`);
  }
  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Missing or incorrect occupation: ${occupation}`);
  }
  return occupation;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender => Object.values(Gender).includes(param);

const isValidType = (param: any): param is EntryType => {
  if (param !== 'Hospital' && param !== 'HealthCheck' && param !== 'OccupationalHealthcare') {
    throw new Error(`Unsupported entry type ${param}`);
  }
  return true;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Missing or incorrect gender: ${gender}`);
  }
  return gender;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Missing or incorrect SSN: ${ssn}`);
  }
  return ssn;
};

const parseDescription = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Missing or incorrect description ${text}`);
  }
  return text;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Missing or incorrect specialist ${specialist}`);
  }
  return specialist;
};

const parseEntryType = (type: any): EntryType => {
  if (!type || !isValidType(type)) {
    throw new Error(`Type ${type} is not valid`);
  }
  return type;
};

const isStringArray = (array: any[]): array is string[] => !array.some(v => !isString(v));

const parseDiagnosisCodes = (value: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(value) || !isStringArray(value)) {
    throw new Error(`Incorrect diagnosis codes, must be strings`);
  }
  return value;
};

const parseCriteria = (value: any): string => {
  if (!value || !isString(value)) {
    throw new Error(`Missing or incorrect discharge criteria`);
  }
  return value;
};

const parseDischarge = (object: any): { date: string, criteria: string } => {
  if (!object) {
    throw new Error(`Missing discharge in hospital entry`);
  }
  return {
    date: parseDate(object.date),
    criteria: parseCriteria(object.criteria)
  };
};

const parseEmployerName = (value: any): string => {
  if (!value || !isString(value)) {
    throw new Error(`Missing or incorrect employer name ${value}`);
  }
  return value;
};

const parseSickLeave = (object: any): { startDate: string, endDate: string } => {
  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate)
  };
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn)
  };
};

const toBaseEntry = (object: any): NewBaseEntry => {
  const entry: NewBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    type: parseEntryType(object.type)
  };

  if (object.diagnosisCodes) {
    entry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }
  return entry;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = toBaseEntry(object) as NewEntry;
  switch (baseEntry.type) {
    case "HealthCheck":
      return {
        ...baseEntry,
        healthCheckRating: HealthCheckRating.CriticalRisk,
      };
    case "Hospital":
      return {
        ...baseEntry,
        discharge: parseDischarge(object.discharge)
      };
    case "OccupationalHealthcare":
      const occupationalEntry = {
        ...baseEntry,
        employerName: parseEmployerName(object.employerName),
      };
      if (object.sickLeave) {
        occupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return occupationalEntry;
    default:
      return assertNever(baseEntry);
  }
};
