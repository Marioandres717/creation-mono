import { useReducer, createContext, FC, ReactNode } from 'react';
import Login from '../components/login-form/login';
import User from '../models/user';

type Props = {
  children: ReactNode;
};
type Actions = { type: string; value?: User };

const userReducer = (state: User, actions: Actions) => {
  switch (actions.type) {
    case 'user_update': {
      return { ...state, ...actions.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${actions.type}`);
    }
  }
};

const AuthContext = createContext({});
const AuthProvider = AuthContext.Provider;

const initialUser: User = {
  email: '',
  active: 0,
};
const Authentication: FC<Props> = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialUser);
  const userApi = {
    user,
    updateUser: (user: User) => {
      dispatch({ type: 'user_update', value: user });
    },
  };

  if (!user.id) {
    return (
      <Login
        onLogin={(user) => {
          userApi.updateUser(user);
        }}
      />
    );
  } else {
    return <AuthProvider value={userApi}>{children}</AuthProvider>;
  }
};

export { Authentication, AuthContext };
