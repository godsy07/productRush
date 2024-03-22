import { useMutation, useQuery } from "@tanstack/react-query"

import { getUserDetails, loginAdmin, loginUser } from "../api/api";

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
