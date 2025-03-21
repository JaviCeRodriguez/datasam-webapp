"use client";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 text-center">
      <p>
        Web desarrollada por{" "}
        <a
          href="https://javo.com.ar/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-500"
        >
          Javo
        </a>
        &nbsp;(con muchos 🧉), para&nbsp;
        <span className="font-semibold text-orange-600 whitespace-nowrap">
          DATA SAM
        </span>{" "}
        © {currentYear}
      </p>
    </footer>
  );
};
