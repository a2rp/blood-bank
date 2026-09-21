import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 320);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goToTop = () => {
        const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    };

    return (
        <Button
            type="button"
            $visible={visible}
            onClick={goToTop}
            aria-label="Go to top"
            title="Go to top"
        >
            <FiArrowUp aria-hidden="true" />
        </Button>
    );
}

const Button = styled.button`
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 1200;
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 50%;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.fg};
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transform: translateY(${({ $visible }) => ($visible ? "0" : "10px")});
    pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
    transition: opacity .2s ease, transform .2s ease, border-color .2s ease,
        box-shadow .2s ease, text-shadow .2s ease;
    cursor: pointer;
    &:hover {
        border-color: ${({ theme }) => theme.fg};
        box-shadow: 0 0 16px ${({ theme }) => theme.border};
        text-shadow: 0 0 8px ${({ theme }) => theme.fg};
    }
    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.fg};
        outline-offset: 3px;
    }
    @media (max-width: 560px) {
        right: 16px;
        bottom: 16px;
    }
`;
