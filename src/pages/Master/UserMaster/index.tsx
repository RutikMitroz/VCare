import { Helmet } from 'react-helmet';
import Layout from "../../../components/Layout";
import LazyLoadingWrapper from '../../../components/utilities/LazyLoadingWrapper';
import RenderUserMaster from '../../../components/_Master/_UserMaster';


const UserMaster = () => {
  return (
    <>
      <Helmet>
        <title>VCare Admin | User Master</title>
      </Helmet>
      <Layout>
        <LazyLoadingWrapper>
          <RenderUserMaster />
        </LazyLoadingWrapper>
      </Layout>
    </>
  );
};

export default UserMaster; 