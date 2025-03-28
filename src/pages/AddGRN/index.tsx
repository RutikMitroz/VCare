import { Helmet } from 'react-helmet';
import Layout from "../../components/Layout";
import LazyLoadingWrapper from '../../components/utilities/LazyLoadingWrapper';
import RenderAddGRN from '../../components/_Inventory/AddGRN';

const AddGRN = () => {
    return (
        <>
            <Helmet>
                <title>VCare Admin | Add GRN</title>
            </Helmet>
            <Layout>
                <LazyLoadingWrapper>
                    <RenderAddGRN />
                </LazyLoadingWrapper>
            </Layout>
        </>
    );
};

export default AddGRN; 