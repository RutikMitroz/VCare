import { useState } from 'react';
import DataTable from './DataTable'
import CreateInvoiceForm from './CreateInvoice';

interface InvoiceProps {
    enquiryDetails: any;
}

const Invoice = ({ enquiryDetails }: InvoiceProps) => {
    const [flag, setFlag] = useState(false);
    return (
        flag ? <DataTable setFlag={setFlag} /> : <CreateInvoiceForm setFlag={setFlag} />

    )
}

export default Invoice;