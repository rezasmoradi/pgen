import React, { useRef } from "react";

function ItemContainer({ textItem, children }) {

    const expandRef = useRef();

    const expand = () => {
        ['hidden', 'flex'].map(cls => { expandRef.current.children[1].classList.toggle(cls); });
        ['after:-rotate-45', 'after:rotate-[135deg]'].map(cls => { expandRef.current.firstChild.classList.toggle(cls) });
    };

    return (
        <div ref={expandRef}>
            <span onClick={expand} className="w-full h-full flex justify-between items-center px-2 outline-none relative dark:text-gray-300 text-sm sm:text-base font-bold text-gray-800 after:absolute after:content-[''] after:top-0 after:bottom-0 after:my-auto after:left-2 after:w-2 after:h-2 after:bg-transparent after:border-b-2 after:border-l-2 after:transition-all duration-300 after:border-slate-800 dark:after:border-gray-300 after:rounded-bl-sm after:float-left after:-rotate-45">
                {textItem}
            </span>
            <div className="hidden w-full flex-col justify-evenly items-start mt-6">
                {children}
            </div>
        </div>
    );
}

export default ItemContainer;