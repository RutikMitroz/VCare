import { useState } from 'react';
import DataTable from './DataTable'
import CreateQuotationForm from './CreateQuotation';

const Quaotation = () => {
    const [flag, setFlag] = useState(false);
    return (
        flag ? <CreateQuotationForm setFlag={setFlag} /> :
            <DataTable setFlag={setFlag} />
    )
}

export default Quaotation;