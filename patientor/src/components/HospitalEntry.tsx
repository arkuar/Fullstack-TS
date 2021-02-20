import React from 'react';
import { Icon, Item, Segment } from 'semantic-ui-react';

interface HospitalEntryProps {
    date: string;
    description: string;
    discharge: {
        date: string;
        criteria: string;
    };
}

const HospitalEntry: React.FC<HospitalEntryProps> = ({ date, description, discharge, children }) => {

    return (
        <Segment>
            <Item >
                <Item.Content>
                    <Item.Header>{date} <Icon name="hospital symbol" /></Item.Header>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <p>Discharge: {discharge.date}, criteria: {discharge.criteria}</p>
                        {children}
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Segment>
    );
};

export default HospitalEntry;