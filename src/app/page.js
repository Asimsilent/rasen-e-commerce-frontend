// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center h-[70vh] text-center">
//       <h1 className="text-4xl font-bold mb-4">Welcome to My Store</h1>
//       <p className="mb-6">Browse products and add them to your cart.</p>
//       <Link href="/products" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//         Go to Products
//       </Link>
//     </div>
//   );
// }

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/products");
}