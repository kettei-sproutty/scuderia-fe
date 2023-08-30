import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go Home</Link>
    </section>
  );
};

export default NotFoundPage;
