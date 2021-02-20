import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setPatient, useStateValue } from '../state';
import { Gender, Patient } from '../types';

const PatientInfo: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();
    
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
        </div>
    );
};

export default PatientInfo;