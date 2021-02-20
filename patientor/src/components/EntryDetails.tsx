import React from 'react';
import { useStateValue } from '../state';
import { Entry } from '../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

interface PatientEntryProps {
    entry: Entry;
}

const EntryDetails: React.FC<PatientEntryProps> = ({ entry }) => {
    const [{ diagnoses }] = useStateValue();

    if (Object.keys(diagnoses).length === 0) {
        return null;
    }

    const diagnoseList = <ul>
        {entry.diagnosisCodes?.map(d =>
            <li key={d}>{d} {diagnoses[d].name}</li>
        )}
    </ul>;

    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry
                {...entry}>
                {diagnoseList}
            </HealthCheckEntry>;
        case "Hospital":
            return <HospitalEntry
                {...entry}>
                {diagnoseList}
            </HospitalEntry>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry
                {...entry}
            >
                {diagnoseList}
            </OccupationalHealthcareEntry>;
    }
};

export default EntryDetails;