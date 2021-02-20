import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import AddEntryModal from '../AddPatientEntry';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Gender, NewEntry, Patient } from '../types';
import EntryDetails from './EntryDetails';

const PatientInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatient(patientFromApi));
            } catch (error) {
                console.log(error);
            }
        };
        if (!patient || patient.id !== id) {
            fetchPatient();
        }
    }, [id, dispatch, patient]);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: NewEntry) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(setPatient(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    if (!patient) {
        return null;
    }

    const genderIcon = (gender: Gender) => {
        if (gender === "male") {
            return <Icon name="mars" />;
        } else if (gender === "female") {
            return <Icon name="venus" />;
        }
    };

    return (
        <div>
            <h1>{patient.name} {genderIcon(patient.gender)}</h1>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h2>entries</h2>
            {patient.entries.map(e =>
                <EntryDetails key={e.id} entry={e} />
            )}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
};

export default PatientInfo;