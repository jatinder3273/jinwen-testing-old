import React from 'react'
import { useStepData } from '../../stepper/UseStepData';
import Radio from '@/components/theme/radio';

const QualifiedPurchaser = () => {
 
  const {data, setData} = useStepData();
    
  return (
    <div className="flex flex-col text-left flex-wrap">
    <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">Qualified Purchaser Status</h2>
    <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
    Select the "qualified purchaser" attestation that best applies to the subscriber.
    </p>

    <div>
      <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
        <Radio
          name="qualified_purchaser_status"
          checked={(+data?.qualified_purchaser_status) === 1}
          required
          value={1}
          label="Investments Value Threshold"
          description="The Subscriber is an individual who (alone, or together with their spouse, if co-subscribing), as of the date hereof, owns at least $5,000,000 in investments."
          onChange={(e) => setData(prevState=> {
            const dataCopy = {...prevState};
            dataCopy["qualified_purchaser_status"] = parseInt(e.target.value);
            return dataCopy;
          })}
        />
      </div>
      

     
      <div className="bg-[#FCFAFA] p-4 mb-4 border w-full border-[#DCE1E6]">
        <Radio
          name="qualified_purchaser_status"
          required
          checked={(+data?.qualified_purchaser_status) === 2}
          value={2}
          label="Knowledgeable Employee"
          description="The Subscriber is a knowledgeable employee within the meaning of Rule 3c-5(a) of the Investment Company Act, and is either (i) a director, executive officer, or general partner of the Fund, or a director, executive officer, or a managing member of a manager or general partner of a general partner of the Fund, each as described in Regulation D, or (ii) an employee or Affiliated Management Person of the Fund who, in connection with the employee's regular functions or duties, participates in the investment activities of the Fund, provided that the employee has been performing such functions and duties for or on behalf of the investment adviser, or substantially similar functions or duties for or on behalf of another company for at least 12 months."
          onChange={(e) => setData(prevData=> {
            const dataCopy = {...prevData};
            dataCopy["qualified_purchaser_status"] = parseInt(e.target.value);
            return dataCopy;
          })}
        />
      </div>

      <div className="bg-[#FCFAFA] p-4 mb-4 border w-full border-[#DCE1E6]">
        <Radio
          name="qualified_purchaser_status"
          required
          checked={(+data?.qualified_purchaser_status) === 3}
          value={3}
          label="None of the above (subscriber is not a qualified purchaser)"
          description="The Subscriber cannot make any of the preceding representations listed and is not qualified purchaser."
          onChange={(e) => setData(prevData=> {
            const dataCopy = {...prevData};
            dataCopy["qualified_purchaser_status"] = parseInt(e.target.value);
            return dataCopy;
          })}
        />
      </div>

      


    
    </div>

    
  
  </div>
  )
}

export default QualifiedPurchaser
