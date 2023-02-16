'use client';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';

type Product = {
  price: Pick<Stripe.Price, 'id' | 'type' | 'unit_amount'>;
  images: Stripe.Product['images'];
  description: Stripe.Product['description'];
};

type Props = {
  tablet: Product;
  magazine: Product;
};

export default function Products(props: Props) {
  const [productQuantity, setProductQuantity] = useState(1);

  async function createSession(price: Product['price'], quantity: number = 1) {
    // fetch to create the session
    const sessionsResponse = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        priceId: price.id,
        mode: price.type === 'recurring' ? 'subscription' : 'payment',
        quantity: quantity,
      }),
    });

    const sessionResponseData = await sessionsResponse.json();

    // redirect the user

    document.location.href = sessionResponseData.session.url;
  }

  return (
    <div>
      <div>
        <h1>Nice Tablet</h1>
        <Image
          src={props.tablet.images[0] || '/images/no-image.png'}
          alt="tablet"
          width={100}
          height={100}
        />
        <p>{props.tablet.description}</p>
        <button
          onClick={() => {
            setProductQuantity(productQuantity <= 1 ? 1 : productQuantity - 1);
          }}
        >
          -
        </button>
        <span>{productQuantity}</span>
        <button
          onClick={() => {
            setProductQuantity(productQuantity + 1);
          }}
        >
          +
        </button>
        {props.tablet.price.unit_amount ? (
          <button
            onClick={async () => {
              // fetch to get the session url
              await createSession(props.tablet.price, productQuantity);
            }}
          >
            Buy for ${(props.tablet.price.unit_amount / 100) * productQuantity}
          </button>
        ) : (
          'out of stock'
        )}
      </div>
      <div>
        <h1>Nice Magazine</h1>
        <Image
          src={props.magazine.images[0] || '/images/no-image.png'}
          alt="tablet"
          width={100}
          height={100}
        />
        <p>{props.magazine.description}</p>
        <p>price</p>
        {props.magazine.price.unit_amount ? (
          <button
            onClick={async () => {
              // fetch to get the session url
              await createSession(props.magazine.price);
            }}
          >
            Buy for ${props.magazine.price.unit_amount / 100}
          </button>
        ) : (
          'out of stock'
        )}
      </div>
    </div>
  );
}
