// hooks/useCategory.ts
import { useState, useEffect } from "react";
import { Category } from "@/src/types";
import { getCategories } from "@/src/services/Categories";

export const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();
        if (Array.isArray(categoriesData?.data?.data)) {
          setCategories(categoriesData.data.data);
        } else {
          console.error("Fetched categories data is not an array:", categoriesData);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

