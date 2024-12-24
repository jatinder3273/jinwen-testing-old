'use-client'
import Radio from '@/components/theme/radio';
import React from 'react'
import { useStepData } from '../../stepper/UseStepData';

const PoliticallyExposedPersonCheck = () => {
  const {data, setData} = useStepData();



  return (
    <div className="flex flex-col text-left flex-wrap">
   <h2 className="text-[24px] md:text-[2rem] leading-[28.8px] font-bold text-[#1C2024]">Politically Exposed Person</h2>
      <p className="text-[#494F53] leading-[28px] mt-2 text-[16px] font-normal">
      Is the subscribing individual affiliated with any, or itself a politically exposed person (a "PEP")? A PEP is a person who is a senior political, governmental, or military figure or an immediate family member or close associate of such a person.
      </p>

      <p className="text-[#494F53] leading-[28px] mt-2 mb-6 text-[16px] font-normal">
      If the subscriber is not a PEP, select "None of the above."
      </p>

      <div>
        <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
          <Radio
            name="political_exposed_person"
            checked={(+data?.political_exposed_person) === 1}
            required
            value={1}
            label="The investor itself is a PEP"
            onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["political_exposed_person"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 mb-4 border w-full border-[#DCE1E6]">
          <Radio
            name="political_exposed_person"
            required
            checked={(+data?.political_exposed_person) === 2}
            value={2}
            label="A person(s) controlling or controlled by the investor is a PEP"
            onChange={(e) => setData(prevData=> {
              const dataCopy = {...prevData};
              dataCopy["political_exposed_person"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>

        <div className="bg-[#FCFAFA] p-4 mb-4 border border-[#DCE1E6]">
          <Radio
            name="political_exposed_person"
            checked={(+data?.political_exposed_person) === 3}
            required
            value={3}
            label="A person(s) with beneficial interests in the investor is a PEP"
           onChange={(e) => setData(prevState=> {
              const dataCopy = {...prevState};
              dataCopy["political_exposed_person"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>
        <div className="bg-[#FCFAFA] p-4 mb-4 border w-full border-[#DCE1E6]">
          <Radio
            name="political_exposed_person"
            required
            checked={(+data?.political_exposed_person) === 4}
            value={4}
            label="A person(s) for whom the investor is acting as agent or nominee for relating to this investment in the fund is a PEP"
            onChange={(e) => setData(prevData=> {
              const dataCopy = {...prevData};
              dataCopy["political_exposed_person"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>

        <div className="bg-[#FCFAFA] p-4  border w-full border-[#DCE1E6]">
          <Radio
            name="political_exposed_person"
            required
            checked={(+data?.political_exposed_person) === 5}
            value={5}
            label="None of the above"
            onChange={(e) => setData(prevData=> {
              const dataCopy = {...prevData};
              dataCopy["political_exposed_person"] = parseInt(e.target.value);
              return dataCopy;
            })}
          />
        </div>


      
      </div>

      
    
    </div>
  )
}

export default PoliticallyExposedPersonCheck
