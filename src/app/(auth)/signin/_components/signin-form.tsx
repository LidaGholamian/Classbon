"use client";

import { Button } from "@/app/_components/button/button";
import { SignIn } from "../_types/signin.types";
import { useForm } from "react-hook-form";
import { TextInput } from "@/app/_components/form-input";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/notification.store";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../_types/signin.schema";
import { signInAction } from "@/actions/auth";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const showNotification = useNotificationStore(
    (state) => state.showNotification,
  );

  //  router.push(`/verify?mobile=${getValues("mobile")}`);
  //  showNotification({
  //    message: "کد تایید به شماره موبایل شما ارسال شد",
  //    type: "info",
  //  });

  const onSubmit = (data: SignIn) => {
    // signIn.submit(data);
    signInAction(data.mobile);
    // startTransition(async () => {
    //   const response = await signInAction(data);
    //   if (response.isSuccess) {
    //     console.log(response.response);
    //   } else {
    //     showNotification({
    //       message: response.error?.detail!,
    //       type: "error",
    //     });
    //   }
    // });
  };

  return (
    <>
      <h5 className="text-2xl">ورود | ثبت نام</h5>
      <p className="mt-2">دنیای شگفت انگیز برنامه نویسی در انتظار شماست!</p>
      <form
        className="flex flex-col gap-6 mt-16"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput<SignIn>
          register={register}
          name={"mobile"}
          errors={errors}
        />

        <Button type="submit" variant="primary">
          تایید و دریافت کد
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
