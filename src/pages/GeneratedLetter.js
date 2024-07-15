// client/src/components/GeneratedLetter.js
import React from 'react';

const GeneratedLetter = ({ letterContent }) => (
  <div>
    <h2>Generated Letter</h2>
    <div dangerouslySetInnerHTML={{ __html: letterContent }} />
  </div>
);

export default GeneratedLetter;
