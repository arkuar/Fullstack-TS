import React from 'react';
import { CoursePart } from '..';
import Part from './Part';

interface ContentProps {
  parts: Array<CoursePart>
}

const Content: React.FC<ContentProps> = ({ parts }) => (
  <div>
    {parts.map(p =>
      <Part key={p.name} part={p} />
    )}
  </div>
)

export default Content;
