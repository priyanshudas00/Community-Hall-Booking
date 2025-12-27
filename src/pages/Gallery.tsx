import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ProgressiveImage } from "@/components/ui/progressive-image";

import entranceOutside from "@/assets/venue/entrance-outside.webp";
import entrance from "@/assets/venue/entrance.webp";
import exterior from "@/assets/venue/exterior.webp";
import interior from "@/assets/venue/interior.webp";

interface Category {
  id: string;
  name: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  category_id: string | null;
}

// Fallback images using local assets
const fallbackImages = [
  { id: "1", image_url: entranceOutside, alt_text: "Venue Entrance Outside", category_id: null },
  { id: "2", image_url: entrance, alt_text: "Venue Main Entrance", category_id: null },
  { id: "3", image_url: exterior, alt_text: "Venue Exterior", category_id: null },
  { id: "4", image_url: interior, alt_text: "Venue Interior", category_id: null },
];

export default function Gallery() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [categoriesRes, imagesRes] = await Promise.all([
        supabase.from("gallery_categories").select("*").eq("is_active", true).order("display_order"),
        supabase.from("gallery_images").select("*").eq("is_active", true).order("display_order"),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (imagesRes.data && imagesRes.data.length > 0) {
        setImages(imagesRes.data);
      } else {
        setImages(fallbackImages);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredImages = selectedCategory
    ? images.filter((img) => img.category_id === selectedCategory)
    : images;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-festive-cream">
        <div className="pattern-lotus absolute inset-0 opacity-50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 text-sm font-medium mb-4">
              Photo Gallery
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Captured <span className="text-gradient-gold">Moments</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our gallery to see the magic we create at every event
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="py-8 border-b border-border bg-card">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-20 bg-festive-warm">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
                    onClick={() => setSelectedImage(image)}
                  >
                    <ProgressiveImage
                      src={image.image_url}
                      alt={image.alt_text || "Gallery Image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.image_url}
              alt={selectedImage.alt_text || "Gallery Image"}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}