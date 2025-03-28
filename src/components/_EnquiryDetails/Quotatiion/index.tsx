import { useState } from 'react';
import DataTable from './DataTable'
import CreateQuotationForm from './CreateQuotation';

interface QuotationProps {
    enquiryDetails: any;
}

const Quaotation = ({ enquiryDetails }: QuotationProps) => {
    const [flag, setFlag] = useState(false);
    return (
        flag ? <CreateQuotationForm setFlag={setFlag} enquiryId={enquiryDetails?._id} clientId={enquiryDetails?.client_id?._id} /> :
            <DataTable setFlag={setFlag} enquiryId={enquiryDetails?._id} currentStatus={enquiryDetails?.status} />
    )
}

export default Quaotation;