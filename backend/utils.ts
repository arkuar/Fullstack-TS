/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string';
};

const parseName = (name: any): string => {
  if(!name || !isString(name)) {
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

const isDate = (date: string): boolean =>  Boolean(Date.parse(date));

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender =>  Object.values(Gender).includes(param);

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
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

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn)
  };

};

export default toNewPatientEntry;