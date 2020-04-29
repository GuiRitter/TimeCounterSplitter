import React from 'react';

export const buildCell = (key, content, attributes) => <td
    {...attributes}
    key={key}
>{content}</td>;

export const buildRow = (...cellList) => <tr>{cellList}</tr>;

export const round = (value, digits) => Math.floor(value * (10 ** digits)) / (10 ** digits)
