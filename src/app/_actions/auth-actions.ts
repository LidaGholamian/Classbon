'use server'

import { createData } from "@/core/http-service";
import { SignIn } from "../(auth)/signin/_types/signin.types";
import { Problem } from "@/types/http-errors.interface";

export async function signInAction(model :SignIn){
    try {
        const response = await createData<SignIn, string>('/signin', {
        mobile: model.mobile
    });
    return {isSuccess: true,response}
    } catch (error: unknown) {
        const err = error as Problem;
        if (err) {
            return {isSuccess: false, error: err}
        }

        return {isSuccess: false, error: {
            status: 500,
            title: '',
            detail: 'خطای ناشناخته'
        } as Problem}
    }

}
