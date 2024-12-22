import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';

const Withdraw = () => {
  const { connect, address } = useStateContext();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }

  return (
    
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Withdraw the fund</h1>
      </div>
      {(address) ? (
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Email Address *"
            placeholder="Write your email address"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('email', e)}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Bank Account *"
            placeholder="Write your bank account number"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('bankAccount', e)}
          />
          <FormField 
            labelName="Wallet Address*"
            placeholder="Write your wallet address"
            inputType="text"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('eWallet', e)}
          />
        </div>

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Apply withdraw"
              styles="bg-[#4a57cd]"
            />
          </div>
      </form>
      ):(
      <div className="flex justify-center items-center p-[16px] sm:min-w-[300px] bg-[#ed2c49] rounded-[10px] mt-[40px]">
        <p className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Connect wallet</p>
      </div>
      )}
    </div>
  )
}

export default Withdraw