import React from 'react';
import { Icon, Item, Segment } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

interface HealthCheckEntryProps {
    date: string;
    description: string;
    healthCheckRating: HealthCheckRating;
}

const HealthCheckEntry: React.FC<HealthCheckEntryProps> = ({ date, description, healthCheckRating, children }) => {

    const getColor = () => {
        switch (healthCheckRating) {
            case 0:
                return "green";
            case 1:
                return "yellow";
            case 2:
                return "red";
            case 3:
                return "black";
            default:
                break;
        }
    };

    return (
        <Segment>
            <Item>
                <Item.Content>
                    <Item.Header>{date} <Icon name="doctor" /></Item.Header>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <Icon color={getColor()} name="heart" />
                        {children}
                    </Item.Extra>
                </Item.Content>
            </Item>
        </Segment>
    );
};

export default HealthCheckEntry;