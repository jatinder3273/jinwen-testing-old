import React, {useContext} from "react";
import Image from "next/image";
import {MdMenu} from "react-icons/md";
import {ArrowBottomIcon, ArrowLeftIcon} from "@/admin_components/icons";
import {StepperContext} from "@/components/clientOnboarding/context/StepperContext";


interface InvestorSidebarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const InvestorSubscriptionSidebar: React.FC<InvestorSidebarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const stepperState = useContext(StepperContext);

  const handleSubItemClick = (index: number) => {
    console.log("SubItem clicked:", index);
    console.log("Step set to:", index);
  };

  const hasData = (stepIdx: number, subStepIdx: number) => {
    const stepData = stepperState.data.get(stepIdx);
    if (stepData) {
      console.log("has data: ", stepIdx, " data\n", stepData);
      return stepData.length >= subStepIdx && !!stepData[subStepIdx];
    } else {
      return false
    }
  }

  const getStepData = (stepIdx: number) => {
    return stepperState.steps[stepIdx];
  }

  return (
    <div
      className={`relative min-h-[100vh]  oweflow-y-auto  bg-dbBlack ${
        isSidebarOpen ? "py-6 px-7 w-64" : "w-16"
      } transition-all duration-300`}
    >
      <button
        className="flex items-center justify-center absolute top-7 right-0 cursor-pointer w-8 h-8 rounded-l-[3rem] bg-primary text-white"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ArrowLeftIcon /> : <MdMenu size={20} />}
      </button>
      {isSidebarOpen && (
        <div>
          <div className="mb-7">
            <Image
              src="/assets/image/logoWhite.svg"
              alt="logo"
              width={144}
              height={42}
              className="mx-auto"
            />
          </div>
          <ul className="space-y-2 font-medium">
              <li className="text-white">
                <div className="flex items-center px-4 py-3 font-normal rounded-lg group h-12 transition">
                  <div className="shrink-0">{getStepData(stepperState.currentStepIdx).icon}</div>
                  <span className="ml-4">{getStepData(stepperState.currentStepIdx).name}</span>

                  {getStepData(stepperState.currentStepIdx).subSteps && (
                    <ArrowBottomIcon
                      height={20}
                      className={`ml-auto transition-transform ${
                        getStepData(stepperState.currentStepIdx).subSteps.length > 0 ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
                {getStepData(stepperState.currentStepIdx).subSteps && (
                  <div className="mt-2 flex flex-col gap-2 pl-6">
                    {getStepData(stepperState.currentStepIdx).subSteps.map((subItem, j) => (
                        subItem.skip?null:
                      <span
                        key={j}
                        onClick={() => handleSubItemClick(j)}
                        className={`block px-4 py-2 cursor-pointer rounded-lg 
                          ${j === stepperState.currentSubStepIdx ? 'text-[#4169e1]' :
                            (hasData(stepperState.currentStepIdx, j)) ? 'text-[#fff] ' : 
                            'text-[#b4b4b4]'}`}>
                        {subItem.name}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default InvestorSubscriptionSidebar;
