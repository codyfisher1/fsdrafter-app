'use client';

import React from "react";
import AccountingFrameworks from "@/app/data/AccountingFrameworks";
import Select from 'react-tailwindcss-select';

export default function SelectFramework(params) {
    const {setSelectedFramework} = params

    const [selected, setSelected] = React.useState(null)

    const frameworks  = AccountingFrameworks().sort((a, b) => a.description.localeCompare(b.description))
    const handleSelect = (selected_framework)=>{
        if (selected_framework!==null){
            const a_frameworks = frameworks.find((framework)=>framework.id===selected_framework.value)
            if (a_frameworks) {
                setSelectedFramework(a_frameworks)
                setSelected(selected_framework)
            }
        } else {
            setSelectedFramework()
            setSelected(null)
        }
    }

    return (
        <div className="w-full">
            <Select
                isMultiple={false}
                isClearable={true}
                isSearchable={true}
                placeholder="Select"
                primaryColor="primary"
                options={frameworks.map((framework)=>({value:framework.id, label:framework.description}))}
                onChange={handleSelect}
                value={selected}
                classNames={{
                    menuButton: ({ isDisabled }) => (
                        "flex overflow-hidden text-sm text-gray-500 p-1 border-2 border-gray rounded-lg shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-black"
                    ),
                    tagItem: ()=> "bg-gray-200 border rounded-sm flex flex-row-reverse pr-1",
                    tagItemText:"truncate max-w-xs overflow-hidden",
                    tagItemIconContainer:"flex items-center px-1 mr-1 cursor-pointer rounded-r-sm hover:bg-gray-400 hover:text-gray-600",
                    menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                    listItem: ({ isSelected }) => (
                        `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                            isSelected
                                ? `text-white bg-blue-500`
                                : `text-gray-500 hover:bg-gray-100`
                        }`
                    )
                }}
            />
        </div>

    );
}