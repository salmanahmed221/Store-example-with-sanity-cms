import { client } from '@/lib/SanityClient';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function GetData() {
  const res = await client.fetch(`*[_type == 'products']`);
  return res;
}

async function Home() {
  const data = await GetData();

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-5 bg-slate-300 py-4">
        My Store
      </h1>
      <div className='md:grid grid-cols-4 gap-5 mt-4 mx-4'>
        {data.map((elem: any) => (
          <div key={elem.id} className='bg-gray-200 px-2 py-2 mb-5'>
            <div className='text-center text-3xl font-bold'>{elem.title}</div>
            <Image src={urlFor(elem.image).url()} alt="img" width={200} height={200} className='mt-3 mx-auto' />
            <p className='text-center mt-3'>
              {elem.description}
            </p>
            <p className='text-center mt-3 text-xl font-semibold'>{elem.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


