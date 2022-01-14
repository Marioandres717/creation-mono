import Layout from '../../components/layout/layout';
import Navbar from '../../components/navbar/navbar';
import Transactions from '../../components/transactions/transactions';

const Home = () => {
  return (
    <Layout>
      <Navbar />
      <Transactions />
    </Layout>
  );
};

export default Home;
