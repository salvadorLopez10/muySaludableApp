import React,{useState} from 'react'

const PaymentScreenViewModel = () => {

  const [values, setValues] = useState({
    email: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  }; 

  return {
    onChange
  };
};

export default PaymentScreenViewModel;