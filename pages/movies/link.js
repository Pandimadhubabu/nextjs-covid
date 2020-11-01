import { Box, Flex } from "reflexbox";
import getConfig from "next/config";
import { NextSeo } from "next-seo";

function Movie({ movie }) {
  const SEO = {
    title: `Next Movies | ${movie.ogTitle}`,
    description: movie.ogDescription,

    openGraph: {
      title: `Next Movies | ${movie.title}`,
      description: movie.ogDescription,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <Box variant="container">
        <Box as="h2" my={40}>
          {movie.ogTitle}
        </Box>
        <Box maxWidth={600}>
          <p dangerouslySetInnerHTML={{ __html: movie.ogDescription }}></p>
        </Box>
      </Box>
    </>
  );
}

const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `${publicRuntimeConfig.API_OG}/metadata/?url=${query.url}`
  );
  const movie = await res.json();
  return {
    props: { movie },
  };
}

export default Movie;
