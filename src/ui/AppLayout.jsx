import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
    @media (max-width: 600px) {
      grid-template-columns: 6rem 1fr;
    }

`;

const Main = styled.main`
background-color: var(--color-grey-100);
padding: 2rem 2.8rem 6.4rem;
overflow-y: scroll;
  @media (max-width: 600px) {
    padding: 1.6rem;
  }
`;

const Container = styled.div`
max-width: 120rem;
margin: 0 auto;
display: flex;
flex-direction: column;
gap: 3.2rem;
@media (max-width: 600px) {
  gap: 1rem;
}
`;


export default function AppLayout() {

    return (
        <StyledAppLayout >

            <Header />
            <Sidebar />

            <Main id='main-wrapper'>
                <Container>
                    <Outlet />
                </Container>
            </Main>

        </StyledAppLayout>
    )
}
