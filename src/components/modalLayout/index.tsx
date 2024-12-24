


import React, { ReactElement } from "react";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa"; 
import styles from "../../components/modalLayout/ModalLayout.module.scss";
import Image from "next/image";
import crossIcon from "../../../public/assets/image/crossIcon.svg"
interface IProps {
    children: React.ReactNode;
    handleToggle: () => void;
    title?: string | ReactElement;
    show?: boolean;
    size?: number;
    dropDowns?: boolean;
    showIcon?: boolean; 
}

const ModalLayout = ({
    children,
    handleToggle,
    title,
    dropDowns,
    show,
    size = 300,
    showIcon = false,
}: IProps) => {
    return (

       
        <Modal
            show={show}
            onHide={handleToggle}
            keyboard={false}
            centered
            className={styles.modal_wrapper}
        >

            <div className={styles.modalLayout} style={{ width: `${size}px` }}>
                {showIcon && (
                    <div className={'flex justify-end'} >
                        <Image src={crossIcon} alt={'close'} onClick={handleToggle} className="cursor-pointer"/>
                    </div>
                )}
                <Modal.Body
                    className={`${dropDowns && styles.addDropOrgnaization}`}
                >
                    {children}
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default ModalLayout;

