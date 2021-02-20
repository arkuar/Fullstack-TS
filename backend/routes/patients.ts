import express from 'express';
import patientService from '../services/patientService';
import { NewEntry } from '../types';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else{
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    try {
      const newEntry: NewEntry = toNewEntry(req.body);
      const updatedPatient = patientService.addEntryToPatient(patient, newEntry);
      res.send(updatedPatient);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(error.message);
    }
  } else {
    res.sendStatus(404);
  }
});

export default router;