import { Helmet } from 'react-helmet';
import Layout from "../../../components/Layout";
import LazyLoadingWrapper from '../../../components/utilities/LazyLoadingWrapper';
import RenderCategory from '../../../components/_Master/_Category';

const Category = () => {
    return (
        <>
            <Helmet>
                <title>VCare Admin | Category Master</title>
            </Helmet>
            <Layout>
                <LazyLoadingWrapper>
                    <RenderCategory />
                </LazyLoadingWrapper>
            </Layout>
        </>
    );
};

export default Category; 