import styled from "styled-components";
import useUser from "../../features/authentication/useUser";
import Spinner from "../Spinner";
import ErrorFallback from "../ErrorFallback";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: { user } = {},
        isPending,
        error,
        isFetched,
    } = useUser();

    useEffect(() => {
        if (!user && !isPending) {
            navigate("/login", { replace: true });
        }
    }, [user, isPending, navigate]);

    if (isPending) {
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );
    }

    if (isFetched && user) {
        queryClient.setQueryData(["user"], { user });
    }

    if (error) {
        return <ErrorFallback error={error} />;
    }

    // At this point:
    // - Either user is available
    // - Or already redirected
    return children;
}
