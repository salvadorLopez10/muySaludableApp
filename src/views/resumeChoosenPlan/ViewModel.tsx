import React, { useState } from 'react'

const ResumeChoosenPlanScreenViewModel = () => {

  const [values, setValues] = useState({
    email: ""
  });

  const onChange  = ( property: string, value: any ) => {

    setValues( {  ...values, [property]: value} );

  } 

  return {
    ...values,
    onChange
  }
  
}

export default ResumeChoosenPlanScreenViewModel;
