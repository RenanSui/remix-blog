import type { z } from "zod";
import type { authSchema } from "../validations/auth";

type Inputs = z.infer<typeof authSchema>;

export const auth = {
  signIn: async (formData: Inputs) => null,

  signUp: async (formData: Inputs) => {
    // console.log(document.cookie)
    // document.cookie = `accessToken=${'some_access_token_test'}`
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    return data
  },

  signOut: async () => {
    document.cookie = `accessToken=; Max-Age=0; path=/`
  }
};
