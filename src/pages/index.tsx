import Head from 'next/head';
import dynamic from 'next/dynamic';

const PixiComponant = dynamic(() => import('../components/index'), {
  ssr: false
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>PIXI LAB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PixiComponant />
    </div>
  );
}
