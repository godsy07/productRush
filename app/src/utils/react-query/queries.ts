import { useMutation, useQuery } from "@tanstack/react-query"

import { addCategory, getCategories, getCategoryFilters, getParentCategories, getUserDetails, loginAdmin, loginUser } from "../api/api";
import { QUERY_KEYS } from "./queryKeys";

export const useUserLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: { username: string, password: string }) => loginUser({ username, password })
  })
}

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: { username: string, password: string }) => loginAdmin({ username, password })
  })
}

export const useGetUserData = () => {
  return useMutation({
    mutationFn: ({ user_id }: { user_id: string }) => getUserDetails({ user_id })
  })
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORIES],
    queryFn: getCategories,
  })
}

export const useGetParentCategories = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PARENT_CATEGORIES],
    queryFn: getParentCategories,
  })
}

export const useGetCategoryFilters = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CATEGORY_FILTERS],
    queryFn: getCategoryFilters,
  })
}

export const useAddCategory = () => {
  return useMutation({
    mutationFn: ({ name, parent_id, image, filters }: { name: string, parent_id: string, image: File[], filters: string[] }) => addCategory({ name, parent_id, image, filters })
  })
}
