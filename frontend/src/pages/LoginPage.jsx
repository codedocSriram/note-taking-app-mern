import React from "react";
import Navbar from "../components/Navbar";
import { Show, SignInButton, SignUpButton } from "@clerk/react";

const LoginPage = () => {
    return (
        <header>
            <div className="h-screen overflow-hidden">
                <header className="bg-base-300 border-b border-base-content/10">
                    <div className="mx-auto max-w-6xl p-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
                                MindPalace💡
                            </h1>
                            <Show when="signed-out">
                                <SignUpButton className="btn btn-primary " />
                            </Show>
                        </div>
                    </div>
                </header>
                <div className="flex flex-col mt-[100px] items-center justify-center">
                    <div className="flex flex-col justify-center mb-4 p-auto">
                        <h4 className="px-4 font-bold text-primary text-wrap:pretty">
                            MindPalace is a virtual place to capture your
                            thoughts💡
                        </h4>
                        <h4 className="px-4 font-bold text-secondary">
                            Signup and start capturing your thoughts in our
                            cloud before they fly away into the cloud ☁️
                        </h4>
                    </div>
                    <img
                        src="/welcome image.svg
                "
                        alt="welcom image"
                        className="h-64 w-64"
                    />
                    {/*  */}
                    <Show when="signed-out">
                        <SignUpButton
                            mode="modal"
                            className="btn btn-primary mt-4"
                        />
                    </Show>
                </div>
            </div>
        </header>
    );
};

export default LoginPage;
