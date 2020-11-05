import styled from "@emotion/styled";
import Link from "next/link";

function Card({ news }) {
  const { API_URL } = process.env;

  return (
    <CardStyled>
      {news.news_img && (
        <div className="image">
          <img src={API_URL + news.news_img.url} alt="" />
        </div>
      )}
      <div className="body">
        <h3>{news.title}</h3>

        <Link href={`/Details/link?url=${news.url}`}>
          <a> Details </a>
        </Link>
      </div>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  width: 100%;
  border: 1.5px solid #cccccc;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  .body {
    padding: 20px;

    h3 {
      margin-bottom: 20px;
    }

    p {
      color: #666666;
      line-height: 1.5;
    }

    a {
      display: inline-block;
      margin: 20px 0;
    }
  }
`;

export default Card;
