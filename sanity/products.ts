export const products = {
  name: 'products',
  type: 'document',
  title: 'Products',
  fields: [
    {
      name: 'title',
      title: 'Product title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Product description',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Product image',
      type: 'image',
    },
    {
      name: 'price',
      title: 'Product price',
      type: 'number',
    },
  ],
};

