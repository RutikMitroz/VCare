import { useState } from 'react';
import DataTable from './DataTable'
import CreateChallanForm from './CreateChallan';

interface ChallanProps {
    enquiryDetails: any;
}

const Challan = ({ enquiryDetails }: ChallanProps) => {
    const [flag, setFlag] = useState(false);
    return (
        flag ? <DataTable setFlag={setFlag} /> : <CreateChallanForm setFlag={setFlag} enquiryDetails={enquiryDetails} />

    )
}

export default Challan;