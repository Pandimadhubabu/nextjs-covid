
import getConfig from "next/config";
import { NextSeo } from "next-seo";

function Movie({ movie }) {
  

  const SEO = {
    title: movie.ogTitle,
    description: movie.ogDescription,
    image: movie.ogImage.url,

    openGraph: {
      title: movie.ogTitle,
      description: movie.ogDescription,
      image: movie.ogImage.url,
    },
  };

  return (
    <>
      <NextSeo {...SEO} />
      <div variant="container">
        <div as="h2" my={40}>
          {movie.ogTitle}
        </div>
        <div maxWidth={600}>
          <img src={movie.ogImage.url} alt={movie.ogTitle} />
          <p dangerouslySetInnerHTML={{ __html: movie.ogDescription }}></p>
        </div>
      </div>
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
