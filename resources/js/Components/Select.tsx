import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    {
        options = null,
        name,
        id,
        value,
        className,
        required,
        handleChange,
    },
) {
    return (
        <div className="flex flex-col items-start">
            <select
                name={name}
                id={id}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                    className
                }
                required={required}
                onChange={(e) => handleChange(e)}
            >
                {options.map((option: any) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});
