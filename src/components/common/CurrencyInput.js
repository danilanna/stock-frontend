import NumberFormat from "react-number-format";
import React from "react";

export default function CurrencyInput(props) {
    const {inputRef, onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator={"."}
            decimalSeparator={","}
            isNumericString={true}
            fixedDecimalScale={true}
            decimalScale={2}
            prefix="R$"
        />
    );
}