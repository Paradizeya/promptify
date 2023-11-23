import "@/styles/pages/notFound.scss";
import Link from "next/link";
import React from "react";

type Props = {
  error?: string;
};

const NotFoundPage = ({ error }: Props) => {
  return (
    <section className="notFound">
      <h1 className="notFound__title">404 | Not Found</h1>
      <p className="notFound__text">
        {error ? error : "Could not find requested resource"}
      </p>
      <Link href="/" className="primary-btn">
        Return Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
