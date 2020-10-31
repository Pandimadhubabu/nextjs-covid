import { Box, Flex } from "reflexbox";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { NextSeo } from "next-seo";

function Movie({ story }) {

  const SEO = {
    title: `Next Movies | ${story.ogTitle}`,
    description: story.ogDescription,

    openGraph: {
      title: `Next Movies | ${story.title}`,
      description: story.ogDescription,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <Box variant="container">
        <Box as="h2" my={40}>
          {story.ogTitle}
        </Box>
        <Box maxWidth={600}>
          <p dangerouslySetInnerHTML={{ __html: story.ogDescription }}></p>
        </Box>
      </Box>
    </>
  );
}

const { publicRuntimeConfig } = getConfig();

export async function getServerSideProps({ query }) {
  let story;
  try {
    const storyId = query.url;
  const res = await fetch(
    `${publicRuntimeConfig.API_OG}/metadata/?url=${storyId}`
  );
  story = await response.json();
  } catch (error) {
    console.log(error);
    story = null;
  }
  return {
    props: {
      story,
    },
  };
}

export default Movie;
