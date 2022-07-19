import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <h1 className="text-center text-4xl font-bold">
          Template</h1>
      </div>
    </div>
  );
}
