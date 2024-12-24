import { FormikProps } from "formik";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

interface IProps extends ReactDatePickerProps {
  name: string;
  label?: string;
  formik?: FormikProps<any>;
}

const DateField: React.FC<IProps> = ({ name, formik, label, ...rest }) => {
  const formikValue = formik?.values[name];
  const formikError = formik?.touched[name] ? formik?.errors[name] : null;

  return (
    <div className="datePicker_wrap">
      <ReactDatePicker
        selected={formikValue}
        customInput={
          <input
            type="text"
            className={`bg-adminBg border-none h-[50px] focus-visible:outline-none px-[18px] py-3 w-full ring-1 rounded-[10px] text-sm font-medium placeholder:font-light ${
              formikError ? "ring-error" : "ring-borderColor"
            }`}
          />
        }
        maxDate={new Date()}
        {...rest}
        className={`${formikError ? "has_error" : ""}`}
      />
      {formikError ? (
        <span className="absolute text-error top-[100%] text-xs text-right right-1">
          {typeof formikError === "string" ? formikError : ""}
        </span>
      ) : null}
    </div>
  );
};

export default DateField;
