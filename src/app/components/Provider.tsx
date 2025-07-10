import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import React from "react";


export default function Provider({ children }: { children: React.ReactNode }) {
    return <SessionProvider refetchInterval={5 * 60} >
        <ImageKitProvider urlEndpoint={`${ process.env.NEXT_PUBLIC_URL_ENDPOINT! }`} >

            {children}
        </ImageKitProvider>
    </SessionProvider>
}