//add to cart action

/*
export async function addToCart(productId: number, quantity: number){
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart')?.value || '[]';
  let cart: { productId: number; quantity: number }[] = JSON.parse(cartCookie);

  // Find if the product is already in the cart
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex > -1) {
    // If it exists, update the quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // If not, add a new item
    cart.push({ productId, quantity });
  }

  // Save the updated cart back to the cookie
  cookieStore.set('cart', JSON.stringify(cart));
}

export async function loadCart() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart')?.value || '[]';
  return JSON.parse(cartCookie);
}

export async function clearCart() {
  const cookieStore = await cookies();
  cookieStore.set('cart', '[]'); // Clear the cart by setting it to an empty array
}

export async function removeFromCart(productId: number) {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart')?.value || '[]';
  let cart: { productId: number; quantity: number }[] = JSON.parse(cartCookie);

  // Filter out the item to be removed
  cart = cart.filter(item => item.productId !== productId);

  // Save the updated cart back to the cookie
  cookieStore.set('cart', JSON.stringify(cart));
}
*/