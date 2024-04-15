'use client';

import React from "react";
import {Select, SelectItem, Chip, ScrollShadow} from "@nextui-org/react";
import IndustryCodes from "@/app/data/IndustryCodes";

export default function SelectIndustry(params) {
    const {setSelectedIndustries} = params

    const sic_codes  = IndustryCodes().sort((a, b) => a.description.localeCompare(b.description))

    const handleSelect = (selected_codes)=>{
        const industries = sic_codes.filter((code)=>Array.from(selected_codes).includes(code.id.toString()))
        if (industries){
            setSelectedIndustries(industries)
        } else {
            setSelectedIndustries()
        }
    }

    return (
        <ScrollShadow
          hideScrollBar
          className="w-full flex"
          orientation="vertical"
        >
        <Select
          size="sm"
          variant="bordered"
          onSelectionChange={handleSelect}
          selectionMode="multiple"
          isMultiline={true}
          renderValue={(items) => {
              return (
                  <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                          <Chip key={item.key}>{item.textValue}</Chip>
                        ))}
                  </div>
              );
          }}
        >
            {sic_codes.map((sic_code) => (
              <SelectItem key={sic_code.id} value={sic_code.id}>
                  {sic_code.description}
              </SelectItem>
            ))}
        </Select>
        </ScrollShadow>
    );
}