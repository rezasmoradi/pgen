import React from "react";

const TextField = React.forwardRef((props, ref) => {

    const inputRef = React.useRef();

    React.useEffect(() => {
        if (props.value === undefined || props.value === null || props.value === '') {
            inputRef.current.firstChild.innerHTML = '';
        } else {
            inputRef.current.firstChild.innerHTML = props.label;
        }
    }, [inputRef.current]);

    React.useEffect(() => {
        if (props.value !== '') {
            inputRef.current.children[1].classList.remove('msm:flex');
            inputRef.current.children[1].classList.add('hidden');
        }
    }, [props.value]);

    const changeInput = e => {
        if (typeof onChange === 'function') onChange(e);
    };

    return (
        <div className={`w-full h-16 my-1 flex relative ${props.className}`}>
            <fieldset ref={inputRef} className={`w-full relative border rounded bg-slate-50 dark:bg-slate-700 disabled:border-slate-100 disabled:bg-white disabled:dark:bg-slate-800 disabled:dark:border-slate-700 ${props.error ? 'border-red-500 animate-fade' : 'dark:border-slate-500'}`}>
                <legend className="text-xs h-4 font-medium transition-all text-gray-700 dark:text-gray-300" />
                <label htmlFor={props.id} className={`hidden w-full absolute top-2 left-1 font-medium mr-3 text-sm text-gray-600 dark:text-gray-300 msm:flex`}>
                    <span className={`text-right pr-4 pt-0.5`}>
                        {props.label}
                    </span>
                    {props.icon}
                </label>
                <div className="w-full h-10 relative flex">
                    <input
                        type={props.type ? props.type : "text"}
                        ref={ref}
                        autoComplete="off"
                        id={props.id}
                        onChange={changeInput}
                        readOnly={props.readOnly || false}
                        disabled={props.disabled || false}
                        multiple={props.multiline}
                        placeholder={props.label}
                        style={{ direction: props.type === 'text' ? 'ltr' : 'rtl' }}
                        value={props.value || ''}
                        className={`w-full h-10 placeholder:text-right placeholder:text-sm placeholder:text-gray-600 dark:placeholder:text-gray-400 text-sm sm:text-base select-none px-3 py-1 outline-none text-gray-900 dark:text-gray-300 font-medium bg-slate-100/10 dark:bg-slate-700 rounded ${props.type === 'password' && 'text-left tracking-widest'} ${props.type === 'text' && props.value && 'font-mono'} tracking-wider disabled:opacity-60 disabled:cursor-not-allowed ltr`}
                        onFocus={(e) => {
                            if (e.currentTarget.placeholder === props.label) e.currentTarget.placeholder = '';
                            inputRef.current.children[1].classList.remove('msm:flex');
                            inputRef.current.classList.add('border-primary');
                            inputRef.current.classList.add('dark:border-primary');
                            inputRef.current.firstChild.innerHTML = props.label ? props.label : '';
                            ['pl-1', 'pr-2'].map(cls => { !props.value && inputRef.current.firstChild.classList.add(cls) });
                            inputRef.current.firstChild.classList.add('animate-[textInput_0.3s_ease-in-out]');
                        }}
                        onBlur={(e) => {
                            inputRef.current.classList.remove('border-primary');
                            inputRef.current.classList.remove('dark:border-primary');
                            if (e.currentTarget.value === '') e.currentTarget.placeholder = props.label;
                            if (inputRef.current.children[2].firstChild.value === '') {
                                inputRef.current.children[1].classList.add('msm:flex');
                                inputRef.current.firstChild.innerHTML = '';
                                inputRef.current.children[1].classList.add('animate-[textInputReverse_0.3s_ease-in-out]');
                                ['pl-1', 'pr-2'].map(cls => { inputRef.current.firstChild.classList.remove(cls) });
                            }
                            if (props.onBlur && typeof props.onBlur === 'function') {
                                onBlur();
                            }
                        }}
                    />
                    {props.type === 'number' && <div className="absolute left-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-800 dark:text-gray-300 cursor-pointer" onClick={() => { typeof props.onChange === 'function' && props.onChange(props.value + 1) }}>
                            <path fillRule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-800 dark:text-gray-300 cursor-pointer" onClick={() => { typeof props.onChange === 'function' && props.onChange(props.value - 1) }}>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>}
                </div>
            </fieldset>
            {props.children}
        </div>
    );
});

export default TextField;