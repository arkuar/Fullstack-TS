import diagnoseData from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData as Array<Diagnosis>;

const getDiagnoses = (): Array<Diagnosis> => diagnoses;

export default {
  getDiagnoses,
};
