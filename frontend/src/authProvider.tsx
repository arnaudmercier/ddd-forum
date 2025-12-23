import { useState, type ReactNode } from 'react';
import AuthContext, {type AuthContextType} from "./authContext";

type Props = { children: ReactNode }

export default function AuthContextProvider({ children }: Props) {
    const [username, setUsername] = useState('');

    const context: AuthContextType = { setUsername, username };

    return (
       <AuthContext.Provider value={context}>
           {children}
       </AuthContext.Provider>
    );
}
