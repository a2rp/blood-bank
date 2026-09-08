import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --radius: 16px;
        --shadow: 0 8px 30px rgba(0,0,0,0.12);
        --bg: ${({ theme }) => theme.bg};
        --text: ${({ theme }) => theme.fg};
        --muted: ${({ theme }) => theme.muted};
        --card: ${({ theme }) => theme.card};
        --border: ${({ theme }) => theme.border};
        --primary: ${({ theme }) => theme.primary};
    }

    body {
        background: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.fg};
    }

    h1, h2, h3, h4, p, label, span { color: ${({ theme }) => theme.fg}; }
    small, .muted { color: ${({ theme }) => theme.muted}; }

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
        border: 1px solid ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.fg};
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
        color: ${({ theme }) => theme.fg};
        text-decoration: none;
        /* &:hover {
            text-decoration: underline;
        } */
    }
`;
