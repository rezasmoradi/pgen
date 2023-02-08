import React from "react";

const Checkbox = React.forwardRef(({ label, defaultChecked = false, onChange = null }, ref) => {
    
    const handleChange = (e) => {
        const target = e.target;
        if (target.checked) {
            target.parentElement.classList.add('before:hidden');
            target.parentElement.classList.remove('text-gray-800');
            target.parentElement.classList.add('text-primary');
            target.previousSibling.classList.remove('hidden');
        } else {
            target.parentElement.classList.remove('before:hidden');
            target.parentElement.classList.remove('text-primary');
            target.parentElement.classList.add('text-gray-800');
            target.previousSibling.classList.add('hidden');
        }

        if (typeof onChange === 'function') onChange(e);
    };

    return (
        <label htmlFor={label} ref={ref} className={`${!!defaultChecked && 'before:hidden text-primary'} w-fit h-9 my-1 text-sm font-medium text-gray-800 relative before:w-5 before:h-5 before:outline-none px-8 dark:text-gray-300 cursor-pointer before:border-2 before:border-primary before:rounded before:right-0 before:top-0 before:absolute before:bg-white before:content-['']`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${!!defaultChecked === false && 'hidden'} animate-fade w-6 h-6 stroke-primary absolute -top-0.5 -right-0.5`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <input type='checkbox' defaultChecked={defaultChecked} id={label} className="hidden" onChange={handleChange} />
            {label}
        </label>
    );
});

export default Checkbox;
