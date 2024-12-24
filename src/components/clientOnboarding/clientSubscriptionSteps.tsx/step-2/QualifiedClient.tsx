


import Radio from '@/components/theme/radio';
import React from 'react';
import { useStepData } from '../../stepper/UseStepData';

const QualifiedClient = () => {
  const { data, setData } = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
       <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">Qualified Client Status</h2>
      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        Select the "qualified client" attestation that best applies to the subscriber:
      </p>

      <div>
        <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
          <Radio
            name="qualified_client_status"
            checked={+data?.qualified_client_status === 1}
            required
            value={1}
            label="Net Worth Threshold"
            description="The Subscriber's individual net worth (or combined net worth with Subscriber's spouse or spousal equivalent), as of the date hereof, exceeds $1,000,000."
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                qualified_client_status: parseInt(e.target.value, 10),
              }))
            }
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 mb-4 border w-full border-[#DCE1E6]">
          <Radio
            name="qualified_client_status"
            required
            checked={+data?.qualified_client_status === 2}
            value={2}
            label="Interest Values Threshold"
            description="The Subscriber, immediately after subscribing for Interests in this Fund, will have at least $1,100,000 under advisement by the Manager."
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                qualified_client_status: parseInt(e.target.value, 10),
              }))
            }
          />
        </div>

        <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
          <Radio
            name="qualified_client_status"
            checked={+data?.qualified_client_status === 3}
            required
            value={3}
            label="Qualified Purchaser"
            description="The Subscriber is an individual that owns at least $5,000,000 in investments or otherwise qualifies as a qualified purchaser."
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                qualified_client_status: parseInt(e.target.value, 10),
              }))
            }
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 border w-full border-[#DCE1E6]">
          <Radio
            name="qualified_client_status"
            required
            checked={+data?.qualified_client_status === 4}
            value={4}
            label="Knowledgeable Employee"
            description="The Subscriber is a knowledgeable employee within the meaning of Rule 3c-5(a) of the Investment Company Act, and is either (i) a director, executive officer, or general partner of the Fund, or a director, executive officer, or a managing member of a manager or general partner of a general partner of the Fund, each as described in Regulation D, or (ii) an employee or Affiliated Management Person of the Fund who, in connection with the employee's regular functions or duties, participates in the investment activities of the Fund, provided that the employee has been performing such functions and duties for or on behalf of the investment adviser, or substantially similar functions or duties for or on behalf of another company for at least 12 months."
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                qualified_client_status: parseInt(e.target.value, 10),
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default QualifiedClient;
