import {Step} from "@/components/clientOnboarding/stepper/FormStepper";
import styles from  "../../../styles/form_stepper.module.scss";
import {Fragment} from "react";
import Image from "next/image";
import checkIcon from '../../../../public/assets/image/checkIcon.svg'

export const StepItem = (props: {step: Step, active: boolean, onClick?: () => void, hasData:boolean, notLast?: boolean, completed?: boolean, className?: string}) => {
    return <Fragment><div
    onClick={props.onClick} className={`${props.className} ${props.active ? 'active' : ''}`}>
        <div className={styles['step-circle']}>{props.active?<div className={styles.centerDot} />:props.completed?<Image  src={checkIcon} alt={'completed'} className={``} />:null}</div>
        <div className={styles.labelContainer}>
            <label className={styles['step-label']}>{props.step.label}</label>
            <label className={styles['step-name']}><strong className="font-bold">{props.step.name}</strong></label>
        </div>
    </div>
        {props.notLast && <div className={styles['step-line']}></div>}

    </Fragment>
}


