"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { Icon } from "@iconify/react";
import { RefreshCw } from "lucide-react"; // İkon üçün
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function LoginPage() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { phone: "", code: "" },
  });

  const enteredPhone = watch("phone");

  const onSendCode = (data: { phone: string }) => {
    console.log("Nömrəyə kod göndərildi:", data.phone);
    setIsCodeSent(true);
  };

  const onVerifyCode = (data: { code: string }) => {
    console.log("Kod təsdiqləndi:", data.code);
    // Backend sorğusu buraya yazılacaq
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="container max-w-md">
        <Card className="w-sm mx-auto shadow-xl border-slate-200">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-2">
              <Icon
                icon={
                  isCodeSent ? "ph:lock-key-open-bold" : "ph:phone-lock-bold"
                }
                className="text-2xl text-[#e73121]"
              />
            </div>
            <CardTitle className="text-2xl font-black text-slate-900">
              {isCodeSent ? "Kodu təsdiqləyin" : "Giriş et"}
            </CardTitle>
            <CardDescription className="text-base">
              {isCodeSent ? (
                <span>
                  <span className="font-semibold text-slate-900">
                    {enteredPhone}
                  </span>{" "}
                  nömrəsinə göndərilən kodu daxil edin.
                </span>
              ) : (
                "Davam etmək üçün mobil nömrənizi daxil edin"
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!isCodeSent ? (
              /* --- ADDIM 1: MOBİL NÖMRƏ --- */
              <form onSubmit={handleSubmit(onSendCode)} className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-bold ml-1 text-slate-700">
                    Mobil nömrə
                  </Label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Nömrə mütləqdir" }}
                    render={({ field: { onChange, value } }) => (
                      <PatternFormat
                        format="+994 (##) ### ## ##"
                        mask="_"
                        customInput={Input}
                        value={value}
                        onValueChange={(values) => onChange(values.value)}
                        placeholder="+994 (__) ___ __ __"
                        className="h-12 font-semibold focus-visible:ring-0 border-slate-200 bg-slate-50/50 text-lg"
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-[#e73121] cursor-pointer hover:bg-red-700 font-bold shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
                >
                  Kod göndər
                </Button>
              </form>
            ) : (
              /* --- ADDIM 2: OTP KODU (YENİ DİZAYN) --- */
              <form
                onSubmit={handleSubmit(onVerifyCode)}
                className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="otp-verification"
                      className="font-bold text-slate-700"
                    >
                      Təsdiq kodu
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-slate-500 hover:text-[#e73121]"
                      onClick={() => alert("Kod yenidən göndərildi")}
                    >
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                      Yenidən göndər
                    </Button>
                  </div>

                  {/* InputOTP Komponenti */}
                  <div className="flex justify-center">
                    <Controller
                      name="code"
                      control={control}
                      rules={{
                        required: "Kod daxil edilməlidir",
                        minLength: {
                          value: 6,
                          message: "Kod 6 rəqəmli olmalıdır",
                        },
                      }}
                      render={({ field }) => (
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="h-12 w-10 text-lg sm:h-14 sm:w-12 sm:text-xl border-slate-200 bg-slate-50"
                            />
                            <InputOTPSlot
                              index={1}
                              className="h-12 w-10 text-lg sm:h-14 sm:w-12 sm:text-xl border-slate-200 bg-slate-50"
                            />
                            <InputOTPSlot
                              index={2}
                              className="h-12 w-10 text-lg sm:h-14 sm:w-12 sm:text-xl border-slate-200 bg-slate-50"
                            />
                          </InputOTPGroup>

                          <InputOTPSeparator className="mx-2 text-slate-300" />

                          <InputOTPGroup className="gap-1">
                            <InputOTPSlot
                              index={3}
                              className="h-12 w-10 text-lg sm:h-14 sm:w-12 sm:text-xl border-slate-200 bg-slate-50"
                            />
                            <InputOTPSlot
                              index={4}
                              className="h-12 w-10 text-lg sm:h-14 sm:w-12 sm:text-xl border-slate-200 bg-slate-50"
                            />
                            <InputOTPSlot
                              index={5}
                              className="h-12 w-10 text-lg sm:h-14 sm:w-12 sm:text-xl border-slate-200 bg-slate-50"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      )}
                    />
                  </div>

                  {errors.code && (
                    <p className="text-xs text-red-500 font-medium text-center">
                      {errors.code.message}
                    </p>
                  )}

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsCodeSent(false)}
                      className="text-sm text-slate-400 hover:text-slate-600 transition-colors underline underline-offset-4"
                    >
                      Nömrə səhvdir? Dəyişdir
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-slate-900 hover:bg-black font-semibold text-white shadow-xl transition-all active:scale-[0.98]"
                >
                  Təsdiqlə və Giriş et
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-2 border-t bg-slate-50/50 p-6 rounded-b-xl">
            <div className="text-center text-xs text-slate-400 mt-2">
              Dəstək lazımdır?{" "}
              <a href="#" className="hover:text-slate-600 underline">
                Bizimlə əlaqə saxlayın
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
