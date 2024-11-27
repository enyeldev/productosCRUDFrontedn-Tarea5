import { Category, Product } from "@/types/GeneralTypes";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_VALUE_NEW_PRODUCT: Omit<Product, "id"> = {
  name: "",
  stock: 0,
  price: 0,
  categoryId: 0,
};

const DEFAULT_VALUE_EDITING_CATEGORY: Category = {
  id: 0,
  name: "",
};

const DEFAULT_VALUE_EDITING_PRODUCT: Product = {
  id: 0,
  name: "",
  stock: 0,
  price: 0,
  categoryId: 0,
};

export const useProductsCrud = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(
    DEFAULT_VALUE_NEW_PRODUCT
  );
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product>(
    DEFAULT_VALUE_EDITING_PRODUCT
  );
  const [editingCategory, setEditingCategory] = useState<Category>(
    DEFAULT_VALUE_EDITING_CATEGORY
  );

  const [isEditing, setIsEditing] = useState(false);

  // Loading states
  const [loadingData, setLoadingData] = useState(false);

  const [researchData, setresearchData] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, [researchData]);

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const responseAllProducts = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Product/GetAllProducts`
      );

      const repsonseAllCategories = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Category/GetAllCategories`
      );

      const dataAllCategories: Category[] = await repsonseAllCategories.json();

      const dataAllProducts: Product[] = await responseAllProducts.json();

      setProducts(dataAllProducts);
      setCategories(dataAllCategories);
    } catch (error) {
      console.log(error);
    }

    setLoadingData(false);
  };

  const addProduct = async () => {
    const { name, price, stock, categoryId } = newProduct;
    if (name === "" || price === 0 || stock === 0 || categoryId === 0) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });

      return;
    }

    toast({
      title: "En progreso...",
      description: "Agregando nuevo producto",
      variant: "default",
    });

    try {
      const requestCreateProduct = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Product/CreateNewProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        }
      );

      const dataCreateProduct = await requestCreateProduct.json();
      setresearchData((prev) => !prev);
      toast({
        title: "Finalizado",
        description: "Nuevo producto agregado correctamente",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }

    setNewProduct(DEFAULT_VALUE_NEW_PRODUCT);
  };

  const updateProduct = async () => {
    const { name, price, stock, categoryId, id } = editingProduct;
    if (name === "" || price === 0 || stock === 0 || categoryId === 0) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "En progreso...",
      description: "Editando producto",
      variant: "default",
    });

console.log(editingProduct);

    try {
      const requestUpdateProduct = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Product/EditProduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );

      const dataUpdateProduct = await requestUpdateProduct.json();
      setEditingCategory(DEFAULT_VALUE_EDITING_PRODUCT);
      setIsEditing(false);
      setresearchData((prev) => !prev);
      toast({
        title: "Finalizado",
        description: "Nuevo producto agregado correctamente",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (id: number) => {
    toast({
      title: "En progreso...",
      description: "Eliminando producto",
      variant: "default",
    });

    try {
      const requestDeleteProduct = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Product/DeleteProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataDeleteProduct = await requestDeleteProduct.json();
      setresearchData((prev) => !prev);
      toast({
        title: "Finalizado",
        description: "Producto eliminado correctamente",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  const addCategory = async () => {
    if (newCategory === "") {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos.",
        variant: "destructive",
      });
      return;
    }

    if (
      categories.some((e) => e.name.toUpperCase() === newCategory.toUpperCase())
    ) {
      console.log("Ya existe esta categoria");
      return;
    }

    const dataBody = {
      Name: newCategory,
    };

    toast({
      title: "En progreso...",
      description: "Agregando nueva categoria.",
      variant: "default",
    });

    try {
      const requestAddCategory = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Category/CreateCategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataBody),
        }
      );

      const responseAddCategory = await requestAddCategory.json();
      setresearchData((prev) => !prev);
      toast({
        title: "Finalizado",
        description: "Nueva categoria agregada correctamente.",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
    setNewCategory("");
  };

  const updateCategory = async () => {
    if (editingCategory.name === "") {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "En progreso...",
      description: "Editando categoria",
      variant: "default",
    });

    const dataBody = {
      Name: editingCategory.name,
    };

    try {
      const requestUpdateCategory = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Category/EditCategory/${
          editingCategory.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataBody),
        }
      );

      const repsosneUpdateCatgeory = await requestUpdateCategory.json();
      setresearchData((prev) => !prev);
      toast({
        title: "Finalizado",
        description: "Categoria editada correctamente.",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }

    setIsEditing(false);
  };

  const deleteCategory = async (id: number) => {
    toast({
      title: "En progreso...",
      description: "Eliminando categoria",
      variant: "default",
    });
    try {
      const requestDeleteCategory = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/Category/DeleteCategory/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resposneDeleteCategory = await requestDeleteCategory.json();
      toast({
        title: "Finalizado",
        description: "Categoria eliminada correctamente",
        variant: "default",
      });
      setresearchData((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  const getIdCotegoryByName = (name: Category["name"]) => {
    const category = categories.find((e) => e.name === name);

    const categoryId = category ? category.id : 0;
    return categoryId;
  };

  const getNameCategoryById = (id: Category["id"]) => {
    const category = categories.find((e) => e.id === id);

    const categoryName = category ? category.name : "";
    return categoryName;
  };

  return {
    products,
    categories,
    newProduct,
    setNewProduct,
    newCategory,
    setNewCategory,
    editingProduct,
    setEditingProduct,
    editingCategory,
    setEditingCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    loadingData,
    isEditing,
    setIsEditing,
    getIdCotegoryByName,
    getNameCategoryById,
  };
};
