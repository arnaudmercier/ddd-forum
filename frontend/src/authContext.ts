import {createContext, type Dispatch, type SetStateAction} from 'react';

export type AuthContextType = {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
