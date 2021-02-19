import React from 'react';
import { CoursePart } from '..';

interface PartProps {
  part: CoursePart
}

const Part: React.FC<PartProps> = ({ part }) => {

  const partAttributes = () => {
    switch (part.name) {
      case "Fundamentals":
        return part.description;
      case "Using props to pass data":
        return part.groupProjectCount;
      case "Deeper type usage":
        return `${part.exerciseSubmissionLink} ${part.description}`
      case "Typescript":
        return `${part.description} ${part.courseCredits}`
      default:
        return null
    }
  }

  return (
    <p>{part.name} {part.exerciseCount} {partAttributes()}</p>
  )
}

export default Part;