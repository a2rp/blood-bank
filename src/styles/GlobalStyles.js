import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --radius: 16px;
        --shadow: 0 8px 30px rgba(0,0,0,0.12);
    }

    html {
        color-scheme: ${({ theme }) =>
            theme.name === "dark" ? "dark" : "light"};
    }

    input, button, select, textarea {
        font: inherit;
        color: inherit;
    }
    input {
        background-color: transparent;
        border: none;
        border: 1px solid #333;
        padding: 0 15px;
        outline: none;
    }

    select {
        background: ${({ theme }) => theme.card};
        color: ${({ theme }) => theme.fg};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 10px;
        padding: 10px 12px;
    }

    select option {
        background: ${({ theme }) => theme.card};
        color: ${({ theme }) => theme.fg};
    }

    select::-ms-expand { display: none; }

    a {
        text-decoration: none;
        /* &:hover {
            text-decoration: underline;
        } */
    }
`;
