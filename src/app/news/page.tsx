import { client } from "@/lib/SanityClient";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function getNews() {
  const news = await client.fetch(
    `*[_type == 'news'] {
      _id,
      title,
      slug,
      description,
      image
    }`
  );
  return news;
}

export const revalidate = 0;

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="min-h-screen bg-black bg-[url('/mainbg.png')] bg-cover bg-center bg-no-repeat">
      <header className="shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center">
          <Link href="/">
            <img src="/logo.svg" alt="/" className="h-[36px] w-[200px]" />
          </Link>
        </div>
      </header>
      <div
        className="max-w-4xl mx-auto rounded-2xl mt-10"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.01)",
          boxShadow:
            "-15px 15px 10px -15px rgba(255, 255, 255, 0.15) inset, 22px -5px 10px -15px rgba(255, 255, 255, 0.15) inset, -16px -16px 10px -15px rgba(255, 255, 255, 0.7) inset, 17px 17px 10px -20px rgba(255, 255, 255, 0.7) inset",
          backdropFilter: "blur(3px)",
        }}
      >
        <div className="px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Latest News
            </h2>
            <Link
              href="/"
              className="px-4 py-2 bg-[#0BC092] text-black font-medium rounded-lg hover:bg-[#0BC092]/80 transition-colors"
            >
              View Blogs →
            </Link>
          </div>
          <div className="grid gap-8">
            {news.map((item: any) => (
              <Link
                key={item._id}
                href={`/news/${item.slug?.current}`}
                className="group"
              >
                <article
                  className="rounded-xl overflow-hidden transition-shadow"
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "0.92px solid transparent",
                    borderImage:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 30%) 1",
                    boxShadow:
                      "0px 0px 26.4px 0px rgba(242, 242, 242, 0.5) inset, -2.4px -3.6px 1.2px -2.4px rgba(179, 179, 179, 0.2) inset, 2.4px 3.6px 1.2px -2.4px rgba(179, 179, 179, 0.2) inset, 3.6px 3.6px 1.2px -4.2px rgba(255, 255, 255, 0.5) inset, -3.6px -3.6px 1.2px -4.2px rgba(255, 255, 255, 0.5) inset",
                  }}
                >
                  <div className="md:flex">
                    {item.image && (
                      <div className="md:w-72 md:flex-shrink-0">
                        <Image
                          src={urlFor(item.image).width(400).height(300).url()}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="h-48 w-full object-cover md:h-full"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-white transition-colors">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-white/70 line-clamp-2">
                        {item.description}
                      </p>
                      <span className="mt-4 inline-block text-[#0BC092] text-sm font-medium">
                        Read more →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {news.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No news yet. Add some in the Sanity Studio.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
