export const posts = {
  name: "posts",
  type: "document",
  title: "Posts",
  fields: [
    {
      name: "title",
      title: "Post Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Post Description",
      type: "text",
    },
    {
      name: "image",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
