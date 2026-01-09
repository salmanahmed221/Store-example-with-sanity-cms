export const news = {
  name: "news",
  type: "document",
  title: "News",
  fields: [
    {
      name: "title",
      title: "News Title",
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
      title: "News Description",
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
