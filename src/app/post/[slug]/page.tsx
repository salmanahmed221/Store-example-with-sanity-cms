import { client } from "@/lib/SanityClient";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function getPost(slug: string) {
  const post = await client.fetch(
    `*[_type == 'posts' && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      image
    }`,
    { slug }
  );
  return post;
}

export const revalidate = 0;

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 px-4 pt-8"
        >
          ← Back to blog
        </Link>

        {post.image && (
          <div className="mt-6">
            <Image
              src={urlFor(post.image).width(1200).height(600).url()}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-64 md:h-96 object-cover rounded-xl mx-4 md:mx-0"
              priority
            />
          </div>
        )}

        <div className="px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="mt-8 prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.description}
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
