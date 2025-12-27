import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Plus, X, Image as ImageIcon, FolderPlus } from "lucide-react";

interface Category {
  id: string;
  name: string;
  display_order: number | null;
  is_active: boolean | null;
}

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  category_id: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

export default function GalleryManagement() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [categoriesRes, imagesRes] = await Promise.all([
      supabase.from("gallery_categories").select("*").order("display_order"),
      supabase.from("gallery_images").select("*").order("display_order"),
    ]);

    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (imagesRes.data) setImages(imagesRes.data);
    setLoading(false);
  }

  async function addCategory() {
    if (!newCategoryName.trim()) return;

    const { data, error } = await supabase
      .from("gallery_categories")
      .insert({ name: newCategoryName.trim(), display_order: categories.length })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    } else if (data) {
      setCategories([...categories, data]);
      setNewCategoryName("");
      setShowAddCategory(false);
      toast({
        title: "Category Added",
        description: `${data.name} has been created`,
      });
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category? Images will be moved to uncategorized.")) return;

    const { error } = await supabase.from("gallery_categories").delete().eq("id", id);

    if (!error) {
      setCategories(categories.filter((c) => c.id !== id));
      setImages(images.map((img) => (img.category_id === id ? { ...img, category_id: null } : img)));
      toast({ title: "Category Deleted" });
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) {
        toast({
          title: "Upload Failed",
          description: uploadError.message,
          variant: "destructive",
        });
        continue;
      }

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(filePath);

      const { data: imageData, error: insertError } = await supabase
        .from("gallery_images")
        .insert({
          image_url: urlData.publicUrl,
          alt_text: file.name.replace(/\.[^/.]+$/, ""),
          category_id: selectedCategory !== "all" ? selectedCategory : null,
          display_order: images.length,
        })
        .select()
        .single();

      if (insertError) {
        toast({
          title: "Error",
          description: "Failed to save image info",
          variant: "destructive",
        });
      } else if (imageData) {
        setImages((prev) => [...prev, imageData]);
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast({
      title: "Upload Complete",
      description: `${files.length} image(s) uploaded`,
    });
  }

  async function deleteImage(id: string, imageUrl: string) {
    if (!confirm("Delete this image?")) return;

    // Extract file name from URL
    const fileName = imageUrl.split("/").pop();
    
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }

    const { error } = await supabase.from("gallery_images").delete().eq("id", id);

    if (!error) {
      setImages(images.filter((img) => img.id !== id));
      toast({ title: "Image Deleted" });
    }
  }

  async function updateImageCategory(id: string, categoryId: string | null) {
    const { error } = await supabase
      .from("gallery_images")
      .update({ category_id: categoryId })
      .eq("id", id);

    if (!error) {
      setImages(images.map((img) => (img.id === id ? { ...img, category_id: categoryId } : img)));
    }
  }

  const filteredImages =
    selectedCategory === "all"
      ? images
      : selectedCategory === "uncategorized"
      ? images.filter((img) => !img.category_id)
      : images.filter((img) => img.category_id === selectedCategory);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h2 className="font-heading text-2xl font-bold">Gallery</h2>
            <p className="text-muted-foreground">Manage photos and categories</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showAddCategory} onOpenChange={setShowAddCategory}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g., Weddings, Receptions"
                    />
                  </div>
                  <Button onClick={addCategory} className="w-full">
                    Add Category
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All ({images.length})
              </Button>
              <Button
                variant={selectedCategory === "uncategorized" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("uncategorized")}
              >
                Uncategorized ({images.filter((img) => !img.category_id).length})
              </Button>
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-1">
                  <Button
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name} ({images.filter((img) => img.category_id === cat.id).length})
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => deleteCategory(cat.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Images Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {filteredImages.length} Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No images in this category</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Images
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || "Gallery image"}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2 p-2">
                      <Select
                        value={image.category_id || "uncategorized"}
                        onValueChange={(value) =>
                          updateImageCategory(image.id, value === "uncategorized" ? null : value)
                        }
                      >
                        <SelectTrigger className="w-full h-8 text-xs bg-white/90">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uncategorized">Uncategorized</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteImage(image.id, image.image_url)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}