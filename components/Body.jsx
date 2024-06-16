'use client';

import React from "react";
import SelectIndustry from "@/components/UI/SelectIndustry";
import SelectDisclosure from "@/components/UI/SelectDisclosure";
import SelectFramework from "@/components/UI/SelectFramework";
import {Divider, Textarea, Button, Popover, PopoverTrigger, PopoverContent, Tooltip} from "@nextui-org/react";
import { faLock, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Body = (props) => {
    const {creditBalance, refreshBalance} = props

    const [selectedDisclosures, setSelectedDisclosures] = React.useState([])
    const [selectedIndustries, setSelectedIndustries] = React.useState([])
    const [selectedFramework, setSelectedFramework] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [generatedDisclosures, setGeneratedDisclosures] = React.useState("")

    const handleClick = () =>{
        setGeneratedDisclosures("")
        setLoading(true)
        fetch('/api/generate-disclosures',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "industries":selectedIndustries,
                "disclosures":selectedDisclosures,
                "framework":selectedFramework,
            }),
        }).then(res => {
            setLoading(false)
            if (!res.ok) {
                res.text().then(err => {throw new Error(err)});
            }
            return res.json();
        }).then(data => {
            setGeneratedDisclosures(data.output)
            refreshBalance()
        }).catch(err => console.error(err));
    }

    const handleCopy = async (e)=>{
        e.stopPropagation()
        e.preventDefault()
        await navigator.clipboard.writeText(generatedDisclosures)
    }

    return (
        <div className="lg:p-0 p-0 sm:p-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <div className="col-span-1">
                    <h4 className="text-medium font-medium mb-1">1. Select Accounting Framework</h4>
                    <SelectFramework setSelectedFramework={setSelectedFramework}/>
                    <Divider className="mb-2 mt-4"/>
                    <h4 className="text-medium font-medium mb-1">2. Select Industries</h4>
                    <SelectIndustry setSelectedIndustries={setSelectedIndustries}/>
                    <Divider className="mb-2 mt-4"/>
                    <h4 className="text-medium font-medium mb-1">3. Select Disclosure Topics</h4>
                    <div>
                        <SelectDisclosure setSelectedDisclosures={setSelectedDisclosures}/>
                    </div>
                    {(creditBalance !== 0 && creditBalance >= selectedDisclosures.length) ?
                        <Button
                            color="primary"
                            className="w-full mt-2"
                            onClick={handleClick}
                            isDisabled={!(selectedDisclosures.length > 0 && selectedIndustries.length > 0 && selectedFramework)}
                        >
                            {(loading) ?
                                <span>Generating...</span>
                                :
                                <span>3. Generate Disclosures ({selectedDisclosures.length} tokens)</span>
                            }
                        </Button>
                        :
                        <Button
                            className="w-full mt-2"
                            isDisabled
                            startContent={<FontAwesomeIcon icon={faLock}/>}
                        >
                            Add Tokens
                        </Button>
                    }
                </div>
                <div className="col-span-1 lg:col-span-2">
                <div className="flex flex-row items-center mb-2">
                        <h4 className="text-medium font-medium m-1">Generated Disclosures</h4>
                        <Tooltip className="w-sm" showArrow={true} delay={500} content={<div>Notice: AI responses may occasionally lack coherence due to<br/> the complexity of language processing algorithms.</div>}>
                            <FontAwesomeIcon className="far pr-4 max-h-3" color="gray" icon={faCircleExclamation}/>
                        </Tooltip>
                        {(!loading && generatedDisclosures.length > 0) && (
                            <Popover
                                placement="top"
                                showArrow="true"
                            >
                                <PopoverTrigger>
                                    <Button
                                        size="sm"
                                        onClick={handleCopy}
                                    >
                                        Copy
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <span>Copied!</span>
                                </PopoverContent>
                            </Popover>
                        )}

                    </div>
                    <Textarea
                        isReadOnly
                        variant="bordered"
                        placeholder={(loading)?"Generating...":"Disclosures not generated yet."}
                        maxRows="36"
                        value={generatedDisclosures}
                    />
                </div>
            </div>
        </div>
    );
};

export default Body;