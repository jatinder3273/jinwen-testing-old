import {useState} from "react"
import {Map} from "immutable";
export interface Validation {validationType: 'MISSING'|'TYPE_MISMATCH'|'TOO_SHORT'|'OTHER', message: string}
export const useValidation = (validationMap: Map<string, Validation[]>) => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
        const target = event.target;
        const validity = target.validity;
        const validations = validationMap.get(target.name);
        let validation: Validation;
        // Customize the error message based on the validation reason
        if (validity.valueMissing) {
            validation = validations.find(validation=> validation.validationType === 'MISSING');
        } else if (validity.typeMismatch) {
            validation = validations.find(validation=> validation.validationType === 'TYPE_MISMATCH');
        } else if (validity.tooShort) {
            validation = validations.find(validation=> validation.validationType === 'TOO_SHORT');
        } else {
            validation = validations.find(validation=> validation.validationType === 'OTHER');
        }
        if (validation) {
            setErrorMessage(validation.message);
        }
    };
    return {errorMessage, handleInvalid};
}