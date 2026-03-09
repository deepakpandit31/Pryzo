import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TrendingDown,LogIn, Bell, Rabbit, Shield } from "lucide-react";
import AddProductForm from "@/components/AddProduct-Form";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { getProducts } from "@/app/Actions";
import ProductCard from "@/components/ProductCard";
export default async function Home() {
  const supabase = await createClient();
  const { data: { user }, } = await supabase.auth.getUser();
  // const user=null; 
  const Products = user ? await getProducts() : [];
  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];
  return (
    <main className="min-h-screen bg-linear-to-br from-[#e3e7ec] to-[#b0cced]">
      <header className="bg-white/30 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 p-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Pryzo Logo" width={600} height={200} className="h-14 w-auto" />
          </div>
          <AuthButton user={user} />
          {/* <Button  size="sm" variant="default" className="bg-blue-500 ml-4  hover:bg-blue-600 text-white">
              
            <LogIn/>
            Sign In
              </Button> */}
        </div>
      </header>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-7 py-3 rounded-full text-sm font-medium mb-6">Created by Deepak Sikhwal • Never overpay online again 💸🛍️
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Never miss a Price Drop again</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Track prices from any e-commerce site. Get instant alerts when
            prices drop. Save money effortlessly.
          </p>

          <AddProductForm user={user} />

          {/* Features */}
          {Products.length === 0 && (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl border border-gray-200"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          )}


        </div>
      </section>

      {/* Products Grid */}
      {user && Products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Your Tracked Products
            </h3>
            <span className="text-sm text-gray-500">
              {Products.length} {Products.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      )}
      {/* Empty State */}
      {user && Products.length === 0 && (
        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12">
            <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600">
              Add your first product above to start tracking prices!
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
