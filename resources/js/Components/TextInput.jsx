import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PasswordEyeOpen from './PasswordEyeOpen';
import PasswordEyeClosed from './PasswordEyeClosed';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className='relative'>
            <input
                {...props}
                type={inputType}
                className={
                    `w-full bg-cream font-medium rounded-sm border border-[#969696] focus:outline-none focus:ring-2 focus:ring-darkgray focus:border-transparent shadow-sm ` + className + (props.error ? 'border-red-500 border-2' : '') 
                }
                ref={input}
            />
            {type === 'password' && (
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                    {showPassword ? (
                        <PasswordEyeOpen/>

                    ): (
                        <PasswordEyeClosed/> 
                    )}
                </button>
            )}
        </div>
    );
});