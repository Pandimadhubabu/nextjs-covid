import styled from "@emotion/styled";
import { useRouter } from "next/router";

function Navigation() {
  const router = useRouter();
  console.log(router);

  return <NavigationStyled></NavigationStyled>;
}

const NavigationStyled = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;

    li {
      margin-left: 10px;
    }

    a {
      text-decoration: none;
      color: #4c9ee3;

      &:hover {
        text-decoration: underline;
      }

      &.active {
        color: #ef6800;
      }
    }
  }
`;

export default Navigation;
