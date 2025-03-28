import { useGetOrderByEnquiryId } from '../../../hooks/enquiry/useGetOrderByEnquiry';
import DataTable from './DataTable'

interface OrderProps {
    enquiryDetails: any;
}

const Order = ({ enquiryDetails }: OrderProps) => {

    const { data } = useGetOrderByEnquiryId(enquiryDetails?._id);

    return (
        <DataTable orderDetails={data?.data} enquiryId={enquiryDetails?._id} currentStatus={enquiryDetails?.status} />
    )
}

export default Order