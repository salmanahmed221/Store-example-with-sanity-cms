import { client } from "@/lib/SanityClient";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

async function getPosts() {
  const posts = await client.fetch(
    `*[_type == 'posts'] {
      _id,
      title,
      slug,
      description,
      image
    }`
  );
  return posts;
}

export const revalidate = 0;

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-gray-900">My Blog</h1>
          <p className="mt-2 text-gray-600">Thoughts, stories and ideas</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-8">
          {posts.map((post: any) => (
            <Link
              key={post._id}
              href={`/post/${post.slug?.current}`}
              className="group"
            >
              <article className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="md:flex">
                  {post.image && (
                    <div className="md:w-72 md:flex-shrink-0">
                      <Image
                        src={urlFor(post.image).width(400).height(300).url()}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="h-48 w-full object-cover md:h-full"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-gray-600 line-clamp-2">
                      {post.description}
                    </p>
                    <span className="mt-4 inline-block text-blue-600 text-sm font-medium">
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No posts yet. Add some in the Sanity Studio.
          </p>
        )}
      </div>
    </main>
  );
}
