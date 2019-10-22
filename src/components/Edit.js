import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Invoice/Form';


export default function Edit() {
  const { id } = useParams();

  return (<Form type={"edit"} id={id}/>);
};
