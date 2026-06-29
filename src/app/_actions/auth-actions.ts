'use server'

import { SignIn } from "../(auth)/signin/_types/signin.types";

export async function signInAction(model :SignIn){
    console.log(model)
}
