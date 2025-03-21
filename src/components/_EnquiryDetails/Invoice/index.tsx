import { useState } from 'react';
import DataTable from './DataTable'
import CreateInvoiceForm from './CreateInvoice';

const Invoice = () => {
    const [flag, setFlag] = useState(false);
    return (
        flag ? <DataTable setFlag={setFlag} /> : <CreateInvoiceForm setFlag={setFlag} />

    )
}

export default Invoice;