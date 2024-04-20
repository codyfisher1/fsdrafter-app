'use client';

import React from "react";
import {CheckboxGroup, Checkbox, Input, Button} from "@nextui-org/react";
import DisclosureTopics from "@/app/data/DisclosureTopics";

export default function SelectDisclosure(params) {
    const {setSelectedDisclosures} = params

    const disclosureData = DisclosureTopics()

    const [disclosures, setDisclosures] = React.useState(disclosureData)
    const [selected, setSelected] = React.useState([]);
    const [search, setSearch] = React.useState('')

    const maxSelection = 10

    const handleSelection = (selection)=> {
        const reverseSelection = [...selection]
        reverseSelection.reverse()
        setSelected(reverseSelection)

        const selectedDisclosures = disclosureData.filter((disclosure)=>reverseSelection.includes(disclosure.id))
        setSelectedDisclosures(selectedDisclosures)
    }

    const handleSearch = (search_text) => {
        const filteredData = [...disclosureData].filter((disclosure)=>disclosure.topic.toLowerCase().includes(search_text.toLowerCase()))
        setDisclosures(filteredData)
        setSearch(search_text)
    }

    const handleSearchClear = ()=>{
        setDisclosures(disclosureData)
        setSearch('')
    }

    const handleSelectedClear = ()=>{
        setSelected([])
    }

    return (
        <div className="h-full">
            <Input
                isClearable
                placeholder="Search"
                type="text"
                size="sm"
                variant="bordered"
                className="mb-2"
                onInput={(e)=>handleSearch(e.target.value)}
                onClear={handleSearchClear}
                value={search}
            />
            <div className="flex-grow p-2 rounded-small border-medium">
                <div className="flex gap-2 mb-2">
                    <span className="p-1 flex-grow">
                        {selected.length} of {maxSelection} topics selected.
                    </span>
                    <Button
                        size="sm"
                        variant="bordered"
                        onClick={handleSelectedClear}
                    >
                        Reset
                    </Button>
                </div>
                <CheckboxGroup
                    onChange={handleSelection}
                    value={selected}
                    classNames={{
                        base: "w-full max-h-[385px] overflow-scroll"
                    }}
                >
                    <div className="flex flex-row flex-wrap">


                    {disclosures.map((disclosure) => (
                        <Checkbox
                            aria-label={disclosure.id}
                            key={disclosure.id}
                            classNames={{
                                base: "w-full m-0 hover:bg-content2 cursor-pointer rounded-md p-1",
                                label: "w-full",
                            }}
                            value={disclosure.id}
                            isDisabled={selected.length>=maxSelection && !selected.includes(disclosure.id)}
                        >
                            <div className="w-full flex justify-between gap-2">
                                <span className="text-tiny text-default-500 capitalize">{disclosure.topic}</span>
                            </div>
                        </Checkbox>
                    ))}
                    </div>
                </CheckboxGroup>
            </div>
        </div>
    );
}