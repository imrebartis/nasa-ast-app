import React, { useEffect, useRef } from 'react';
import Pikaday from 'pikaday';
import '../../../node_modules/pikaday/css/pikaday.css';
import './DatePicker.css';

interface ComponentProps {
  id: string;
  pickerStyle: string;
  labelStyle: string;
  labelText: string;
  defaultDate: any;
  setDate: any;
  minDate: any;
  maxDate: any;
  isEditable: boolean;
}

const DatePicker = ({
  id, pickerStyle, labelStyle, labelText, defaultDate, setDate, minDate, maxDate, isEditable,
}: ComponentProps) => {
  const elementRef = useRef(null);

  const isDisabled = isEditable === undefined ? false : !isEditable;

  useEffect(() => {
    const element = elementRef.current;
    const picker = new Pikaday({
      field: element,
      format: 'DD.MM.YYYY',
      showWeekNumber: true,
      firstDay: 1,
      showDaysInNextAndPreviousMonths: true,
      enableSelectionDaysInNextAndPreviousMonths: true,
      defaultDate: defaultDate.toDate(),
      setDefaultDate: true,
      onSelect: () => {
        const offsetMinutes = picker.getMoment().utcOffset();
        setDate(picker.getMoment().utc().add(offsetMinutes, 'minutes'));
      },
    });

    if (minDate) {
      picker.setMinDate(minDate.toDate());
    }

    if (maxDate) {
      picker.setMaxDate(maxDate.toDate());
    }

    return () => {
      picker.destroy();
    };
  }, [defaultDate, setDate, minDate, maxDate]);

  return (
    <>
      {labelText
        ? <label htmlFor={id} className={labelStyle}>{labelText}</label>
        : null}
      <input
        id={id}
        className={pickerStyle}
        type='text'
        ref={elementRef}
        placeholder='dd.mm.yyyy'
        autoComplete='off'
        disabled={isDisabled}
      />
    </>
  );
};

export default DatePicker;
