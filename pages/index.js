import Card from "components/Card";
import { Flex, Box } from "reflexbox";

const Home = ({ news19 }) => {
  return (
    <Box variant="container">
      <Box my={20} as="h2">
        Covid19 News
      </Box>
      <Flex
        justifyContent="space-between"
        flexDirection={{ _: "column", md: "row" }}
        mb={100}
        flexWrap="wrap"
      >
        {news19.map((news) => (
          <Box key={news.index} width={{ _: "100%", md: "30%" }}>
            <Card news={news} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export async function getServerSideProps() {
  const { API_URL } = process.env;

  const res = await fetch(`${API_URL}/api/news`);
  const data = await res.json();

  return {
    props: {
      news19: data,
    },
  };
}

export default Home;
