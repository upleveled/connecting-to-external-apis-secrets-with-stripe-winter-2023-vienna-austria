import { stripeClient } from '../util/stripe';
import Products from './Products';

export const metadata = { description: 'Products Page' };

export default async function HomePage() {
  const tablet = await stripeClient.products.retrieve('prod_KJMmxsxdtmenaN', {
    expand: ['default_price'],
  });
  const magazine = await stripeClient.products.retrieve('prod_KJMwcZw5q0IJ3x', {
    expand: ['default_price'],
  });

  if (
    !(tablet.default_price instanceof Object) ||
    !(magazine.default_price instanceof Object)
  ) {
    return <strong>All products must contain a valid price</strong>;
  }

  return (
    <Products
      tablet={{
        price: {
          id: tablet.default_price.id,
          type: tablet.default_price.type,
          unit_amount: tablet.default_price.unit_amount,
        },

        images: tablet.images,
        description: tablet.description,
      }}
      magazine={{
        price: {
          id: magazine.default_price.id,
          type: magazine.default_price.type,
          unit_amount: magazine.default_price.unit_amount,
        },
        images: magazine.images,
        description: magazine.description,
      }}
    />
  );
}
