'use client';

import React from "react";
import IndustryCodes from "@/app/data/IndustryCodes";
import Select from 'react-tailwindcss-select';

export default function SelectIndustry(params) {
    const {setSelectedIndustries} = params

    const [selected, setSelected] = React.useState(null)

    const sic_codes  = IndustryCodes().sort((a, b) => a.description.localeCompare(b.description))
    const handleSelect = (selected_codes)=>{
        if (selected_codes!==null){
            const industries = selected_codes.map((selected_code)=>sic_codes.find((code)=>code.id===selected_code.value))
            if (industries) {
                setSelectedIndustries(industries)
                setSelected(selected_codes)
            }
        } else {
            setSelectedIndustries([])
            setSelected(null)
        }
    }

    return (
        <div className="w-full">
            <Select
                isMultiple={true}
                isClearable={true}
                isSearchable={true}
                placeholder="Select"
                primaryColor="primary"
                options={sic_codes.map((sic_code)=>({value:sic_code.id, label:sic_code.description}))}
                onChange={handleSelect}
                value={selected}
                classNames={{
                    menuButton: ({ isDisabled }) => (
                        "flex overflow-x-scroll text-sm text-gray-500 p-1 border-2 border-gray rounded-lg shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-black"
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