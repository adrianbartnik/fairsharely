import Link from "next/link";

export default function Custom404() {
  return (
    <section className="h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl items-center justify-center px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 lg:text-9xl dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Something is missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can not find that page. You will find lots to explore on
            the home page.{" "}
          </p>
          <Link
            href="/"
            className="my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
