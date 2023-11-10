import Link from "next/link";
import React from "react";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <section className="notFound">
      <h2 className="notFound__title">404 | Not Found</h2>
      <p className="notFound__text">Could not find requested resource</p>
      <Link href="/" className="primary-btn">
        Return Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
