import { useMutation } from "@tanstack/react-query"

import { loginAdmin, loginUser } from "../api/api";

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
