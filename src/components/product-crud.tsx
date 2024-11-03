import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductsCrud } from "@/hooks/useProductsCrud";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";

export function ProductCrud() {
  const {
    categories,
    editingCategory,
    editingProduct,
    newCategory,
    newProduct,
    products,
    setEditingCategory,
    setEditingProduct,
    setNewCategory,
    setNewProduct,
    addCategory,
    addProduct,
    deleteProduct,
    deleteCategory,
    updateCategory,
    updateProduct,
    loadingData,
    isEditing,
    setIsEditing,
    getIdCotegoryByName,
    getNameCategoryById,
  } = useProductsCrud();

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Productos</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  isEditing ? updateProduct() : addProduct();
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      value={isEditing ? editingProduct.name : newProduct.name}
                      onChange={(e) =>
                        isEditing
                          ? setEditingProduct({
                              ...editingProduct,
                              name: e.target.value,
                            })
                          : setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={
                        isEditing ? editingProduct.stock : newProduct.stock
                      }
                      onChange={(e) =>
                        isEditing
                          ? setEditingProduct({
                              ...editingProduct,
                              stock: Number(e.target.value),
                            })
                          : setNewProduct({
                              ...newProduct,
                              stock: Number(e.target.value),
                            })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio</Label>
                    <Input
                      id="price"
                      type="number"
                      value={
                        isEditing ? editingProduct.price : newProduct.price
                      }
                      onChange={(e) =>
                        isEditing
                          ? setEditingProduct({
                              ...editingProduct,
                              price: Number(e.target.value),
                            })
                          : setNewProduct({
                              ...newProduct,
                              price: Number(e.target.value),
                            })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={
                        isEditing
                          ? getNameCategoryById(editingProduct.categoryId)
                          : getNameCategoryById(newProduct.categoryId)
                      }
                      onValueChange={(value) =>
                        isEditing
                          ? setEditingProduct({
                              ...editingProduct,
                              categoryId: getIdCotegoryByName(value),
                            })
                          : setNewProduct({
                              ...newProduct,
                              categoryId: getIdCotegoryByName(value),
                            })
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit">
                  {isEditing ? "Actualizar" : "Agregar"} Producto
                </Button>
              </form>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Lista de Productos
                </h3>
                <div className="space-y-2">
                  {loadingData ? (
                    <div className="flex items-center justify-between p-2 rounded">
                      <div className=" flex gap-4">
                        <Skeleton className="w-[150px] h-4" />
                        <Skeleton className="w-[150px] h-4" />
                      </div>

                      <div className="flex gap-4">
                        <Skeleton className="w-[100px] h-8" />
                        <Skeleton className="w-[100px] h-8" />
                      </div>
                    </div>
                  ) : products.length === 0 ? (
                    <p className="text-lg font-semibold text-center">
                      No hay productos
                    </p>
                  ) : (
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        <span>
                          {product.name} - Stock: {product.stock} - Precio: $
                          {product.price} - Categoría:{" "}
                          {getNameCategoryById(product.categoryId)}
                        </span>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => {
                              setIsEditing(true);
                              setEditingProduct(product);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Categorías</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  isEditing ? updateCategory() : addCategory();
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="categoryName">Nombre de la Categoría</Label>
                  <Input
                    id="categoryName"
                    value={isEditing ? editingCategory.name : newCategory}
                    onChange={(e) =>
                      isEditing
                        ? setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        : setNewCategory(e.target.value)
                    }
                  />
                </div>
                <Button type="submit" className="text-center">
                  {isEditing ? "Actualizar Categoría" : "Agregar Categoría"}
                </Button>
              </form>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Lista de Categorías
                </h3>
                <div className="space-y-2">
                  {loadingData ? (
                    <div className="flex items-center justify-between p-2 rounded">
                      <div className=" flex gap-4">
                        <Skeleton className="w-[150px] h-4" />
                      </div>

                      <div className="flex gap-4">
                        <Skeleton className="w-[100px] h-8" />
                        <Skeleton className="w-[100px] h-8" />
                      </div>
                    </div>
                  ) : categories.length === 0 ? (
                    <p className="text-lg font-semibold text-center">
                      No hay categorias
                    </p>
                  ) : (
                    categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded"
                      >
                        <span>{category.name}</span>
                        <div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => {
                              setIsEditing(true);
                              setEditingCategory(category);
                            }}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteCategory(category.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
