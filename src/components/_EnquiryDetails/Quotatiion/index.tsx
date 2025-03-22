import { useState } from 'react';
import DataTable from './DataTable'
import CreateQuotationForm from './CreateQuotation';

interface QuotationProps {
    enquiryDetails: any;
}

const Quaotation = ({ enquiryDetails }: QuotationProps) => {
    const [flag, setFlag] = useState(false);
    return (
        flag ? <CreateQuotationForm setFlag={setFlag} /> :
            <DataTable setFlag={setFlag} quotations={enquiryDetails?.quotations} />
    )
}

export default Quaotation;