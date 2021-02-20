import React from 'react';
import { Icon, Item, Segment } from 'semantic-ui-react';

interface OccupationalEntryProps {
    date: string;
    employerName: string;
    description: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

const OccupationalHealthcareEntry: React.FC<OccupationalEntryProps> = ({ date, description, employerName, sickLeave, children }) => {

    return (
        <Segment>
            <Item >
                <Item.Content>
                    <Item.Header>{date} <Icon name="stethoscope" /> {employerName}</Item.Header>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        {sickLeave ? 
                        <p>Sick leave from {sickLeave.startDate} to {sickLeave.endDate}</p>
                            : null}
                        {children}
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Segment>
    );

};

export default OccupationalHealthcareEntry;