"use client";
import { CheckboxItem } from '@radix-ui/react-dropdown-menu';
import React from 'react';

interface ReportState {
    city_name: string;
    company_name: string;
    country_name: string;
    industry: string;
    mock_data: boolean;
    inputComplete: boolean;
}

interface ReportDataEntryProps {
    setReportState: (state: ReportState) => void;
}

export default function ReportDataEntry({ setReportState }: ReportDataEntryProps) {
    var handleSubmit = (event:any) => {
        event.preventDefault();
        setReportState({
            city_name: event.target.city_name.value,
            company_name: event.target.company_name.value,
            country_name: event.target.country_name.value,
            industry: event.target.industry.value,
            mock_data: false,
            inputComplete:true
        })
      }

    return (
        <div>
            <h1 className='text-center py-10'>Generate Company Report</h1>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
                    <div>
                        <label htmlFor="company_name">Company Name:</label>
                        <input type="text" id="company_name" name="company_name" />
                    </div>
                    <div>
                        <label htmlFor="country_name">Country:</label>
                        <input type="text" id="country_name" name="country_name" />
                    </div>
                    <div>
                        <label htmlFor="city_name">City:</label>
                        <input type="text" id="city_name" name="city_name" />
                    </div>
                    <div>
                        <label htmlFor="industry">Industry:</label>
                        <input type="text" id="industry" name="industry" />
                    </div>
                    <div><button className="outline-black outline text-black focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 m-5" type="submit">Submit</button></div>
                </div>
            </form>
        </div>
    );
}