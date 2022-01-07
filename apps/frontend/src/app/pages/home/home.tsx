import Categories from '../../components/categories/categories';
import Layout from '../../components/layout/layout';
import Transactions from '../../components/transactions/transactions';

const Home = () => {
  return (
    <Layout>
      <Transactions />
      <Categories />
    </Layout>
  );
};

export default Home;
