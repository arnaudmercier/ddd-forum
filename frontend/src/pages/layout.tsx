import {Header} from "./header.tsx";
import React from "react";

export const Layout: React.FC<React.PropsWithChildren> = ({children}) => (
    <>
        <Header/>
        <div className='content-container'>
            {children}
        </div>
    </>
)
