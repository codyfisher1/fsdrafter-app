'use client';

import React from "react";
import SelectIndustry from "@/components/UI/SelectIndustry";
import SelectDisclosure from "@/components/UI/SelectDisclosure";
import {Divider, Textarea, Button, Popover, PopoverTrigger, PopoverContent, ScrollShadow} from "@nextui-org/react";
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Body = (props) => {
    const {creditBalance, refreshBalance} = props

    const [selectedDisclosures, setSelectedDisclosures] = React.useState([])
    const [selectedIndustries, setSelectedIndustries] = React.useState()
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
            }),
        }).then(res => {
            setLoading(false)
            if (!res.ok) {
                res.text().then(err => {throw new Error(err)});
            }
            return res.json();
        }).then(data => {
            console.log('API response data', data);
            setGeneratedDisclosures(data.output)
            refreshBalance()
        }).catch(err => console.error(err));
    }

    const handleCopy = ()=>{
        navigator.clipboard.writeText(generatedDisclosures)
    }

    return (
        <div className="lg:p-0 p-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                <div className="col-span-1">
                    <h4 className="text-medium font-medium mb-1">1. Select Industries</h4>
                    <SelectIndustry setSelectedIndustries={setSelectedIndustries}/>
                    <Divider className="mb-2 mt-4" />
                    <h4 className="text-medium font-medium mb-1">2. Select Disclosure Topics</h4>
                    <div>
                        <SelectDisclosure setSelectedDisclosures={setSelectedDisclosures}/>
                    </div>
                    {(creditBalance!==0 && creditBalance>selectedDisclosures.length*10 )?
                        <Button
                            color="primary"
                            className="w-full mt-2"
                            onClick={handleClick}
                            isDisabled={!(selectedDisclosures.length>0 && selectedIndustries)}
                        >
                            {(loading)?
                                <span>Generating...</span>
                                :
                                <span>3. Generate Disclosures ({selectedDisclosures.length*10} tokens)</span>
                            }
                        </Button>
                    :
                        <Button
                            className="w-full mt-2"
                            isDisabled
                            startContent={<FontAwesomeIcon icon={faLock} />}
                        >
                            Add Tokens
                        </Button>
                    }
                </div>
                <div className="col-span-2">
                    <div className="flex flex-row items-center mb-2">
                        <h4 className="text-medium font-medium m-1">Generated Disclosures</h4>
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
                        maxRows="40"
                        value={generatedDisclosures}
                    />
                </div>
            </div>
        </div>
    );
};

export default Body;