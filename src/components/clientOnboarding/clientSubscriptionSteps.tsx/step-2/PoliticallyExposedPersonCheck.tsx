

'use-client'
import Radio from '@/components/theme/radio';
import React from 'react'
import { useStepData } from '../../stepper/UseStepData';

const PoliticallyExposedPersonCheck = () => {
  const { data, setData } = useStepData();

  return (
    <div className="flex flex-col text-left flex-wrap">
      <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">
        Politically Exposed Person
      </h2>

      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
        Is the subscribing individual affiliated with any, or itself a politically exposed person (a "PEP")? A PEP is a person who is a senior political, governmental, or military figure or an immediate family member or close associate of such a person.
      </p>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
        If the subscriber is not a PEP, select "None of the above."
      </p>

      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <div
            key={value}
            className={`p-4 mb-4 border ${
              (+data?.political_exposed_person) === value
                ? 'border-[#3190E6] bg-[#3190E60F]'
                : 'border-[#DCE1E6] bg-[#FCFAFA]'
            }`}
          >
            <Radio
              name="political_exposed_person"
              required
              checked={(+data?.political_exposed_person) === value}
              value={value}
              label={
                value === 1
                  ? 'The investor itself is a PEP'
                  : value === 2
                  ? 'A person(s) controlling or controlled by the investor is a PEP'
                  : value === 3
                  ? 'A person(s) with beneficial interests in the investor is a PEP'
                  : value === 4
                  ? 'A person(s) for whom the investor is acting as agent or nominee for relating to this investment in the fund is a PEP'
                  : 'None of the above'
              }
              onChange={(e) => setData((prevState) => {
                const dataCopy = { ...prevState };
                dataCopy['political_exposed_person'] = parseInt(e.target.value);
                return dataCopy;
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticallyExposedPersonCheck;
