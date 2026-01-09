import { client } from "@/lib/SanityClient";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function getNewsItem(slug: string) {
  const newsItem = await client.fetch(
    `*[_type == 'news' && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      image
    }`,
    { slug }
  );
  return newsItem;
}

export const revalidate = 0;

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const newsItem = await getNewsItem(params.slug);

  if (!newsItem) {
    notFound();
  }

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
        <div className="px-4 py-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#0BC092] hover:text-[#0BC092]/80 transition-colors"
          >
            ← Back to news
          </Link>

          <article
            className="mt-6 rounded-xl overflow-hidden"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              border: "0.92px solid transparent",
              borderImage:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 30%) 1",
              boxShadow:
                "0px 0px 26.4px 0px rgba(242, 242, 242, 0.5) inset, -2.4px -3.6px 1.2px -2.4px rgba(179, 179, 179, 0.2) inset, 2.4px 3.6px 1.2px -2.4px rgba(179, 179, 179, 0.2) inset, 3.6px 3.6px 1.2px -4.2px rgba(255, 255, 255, 0.5) inset, -3.6px -3.6px 1.2px -4.2px rgba(255, 255, 255, 0.5) inset",
            }}
          >
            {newsItem.image && (
              <Image
                src={urlFor(newsItem.image).width(1200).height(600).url()}
                alt={newsItem.title}
                width={1200}
                height={600}
                className="w-full h-64 md:h-96 object-cover"
                priority
              />
            )}

            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                {newsItem.title}
              </h1>

              <div className="mt-6">
                <p className="text-white/70 leading-relaxed whitespace-pre-wrap">
                  {newsItem.description}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
