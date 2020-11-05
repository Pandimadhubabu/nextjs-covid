import fetch from "pages/Details/isomorphic-unfetch";
import Error from "pages/Details/next/error";
import { NextSeo } from "pages/Details/next-seo";

export async function getServerSideProps({ query }) {
  let story;

  try {
    const storyId = query.url;
    const response = await fetch(
      `https://www.opengraph.xyz/.netlify/functions/metadata/?url=${storyId}`
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

const Story = ({ story }) => {
  if (!story) {
    return <Error statusCode={503} />;
  }

  return (
    <main>
      <h1 className="story-title">
        <a href={story.requestUrl}>{story.ogTitle}</a>
      </h1>
      {story.title}
    </main>
  );
};

export default Story;
