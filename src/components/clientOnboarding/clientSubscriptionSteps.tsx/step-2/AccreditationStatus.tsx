import React from 'react'
import { useStepData } from '../../stepper/UseStepData';
import Radio from '@/components/theme/radio';

const AccreditationStatus = () => {
    const {data, setData} = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
     <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">Accreditation Status</h2>
      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
      Select the "accredited investor" attestation that best applies to the subscriber:
      </p>

      <div>
        <div className="bg-[#FCFAFA] p-4 border border-[#DCE1E6]">
          <Radio
            name="accreditation_status"
            checked={(+data?.accreditation_status) === 1}
            required
            value={1}
            label="Net Worth Threshold"
            description="The Subscriber's individual net worth (or combined net worth with Subscriber's spouse or spousal equivalent), as of the date hereof, exceeds $1,000,000."
            onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["accreditation_status"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 mt-4 border w-full border-[#DCE1E6]">
          <Radio
            name="accreditation_status"
            required
            checked={(+data?.accreditation_status) === 2}
            value={2}
            label="Income Threshold"
            description="The Subscriber had individual income of more than $200,000 (or combined income with Subscriber's spouse or spousal equivalent of more than $300,000, if co-subscribing) in each of the past two years, and reasonably expects to reach the same income level in the current year."
            onChange={(e) => setData(prevData=> {
              const dataCopy = {...prevData};
              dataCopy["accreditation_status"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>

        <div className="bg-[#FCFAFA] p-4 mt-4 border border-[#DCE1E6]">
          <Radio
            name="accreditation_status"
            checked={(+data?.accreditation_status) === 3}
            required
            value={3}
            label="Eligible FINRA License Holder"
            description="The Subscriber holds and maintains, in good standing, one of the following certifications/designations administered by the Financial Industry Regulatory Authority"
            onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["accreditation_status"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 mt-4 border w-full border-[#DCE1E6]">
          <Radio
            name="accreditation_status"
            required
            checked={(+data?.accreditation_status) === 4}
            value={4}
            label="Knowledgeable Employee"
            description="The Subscriber is a knowledgeable employee within the meaning of Rule 3c-5(a) of the Investment Company Act, and is either (i) a director, executive officer, or general partner of the Fund, or a director, executive officer, or a managing member of a manager or general partner of a general partner of the Fund, each as described in Regulation D, or (ii) an employee or Affiliated Management Person of the Fund who, in connection with the employee's regular functions or duties, participates in the investment activities of the Fund, provided that the employee has been performing such functions and duties for or on behalf of the investment adviser, or substantially similar functions or duties for or on behalf of another company for at least 12 months."
            onChange={(e) => setData(prevData=> {
              const dataCopy = {...prevData};
              dataCopy["accreditation_status"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>

        <div className="bg-[#FCFAFA] p-4 mt-4 border w-full border-[#DCE1E6]">
          <Radio
            name="accreditation_status"
            required
            checked={(+data?.accreditation_status) === 5}
            value={5}
            label="None of the above (subscriber is not accredited)"
            description="The Subscriber cannot make any of the preceding representations listed and is not an accredited investor."
            onChange={(e) => setData(prevData=> {
              const dataCopy = {...prevData};
              dataCopy["accreditation_status"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>


      
      </div>

      
    
    </div>
  )
}

export default AccreditationStatus
