import { useReducer, createContext, FC, ReactNode } from 'react';
import Login from '../components/login-form/login';
import { User } from '@creation-mono/shared/types';

import { gql, useQuery } from '@apollo/client';

/** TYPES */
type Props = {
  children: ReactNode;
};
type Actions = { type: string; value?: User };
/*******/

/** Get User Query */
const GETUSER_QUERY = gql`
  query me {
    me {
      id
      username
      email
      isActive
    }
  }
`;

const userStore = (state: User, actions: Actions) => {
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
  id: '0',
  email: '',
};
const Authentication: FC<Props> = ({ children }) => {
  const { loading } = useQuery(GETUSER_QUERY, {
    onCompleted: ({ me }: { me: User }) => {
      userApi.updateUser(me);
    },
  });
  const [user, dispatch] = useReducer(userStore, initialUser);
  const userApi = {
    getUser: (): User => {
      return user;
    },
    updateUser: (user: User) => {
      dispatch({ type: 'user_update', value: user });
    },
  };

  let template;
  if (loading) {
    template = <div>loading...</div>;
  } else if (user.id === '0') {
    template = (
      <Login
        onLogin={(user) => {
          userApi.updateUser(user);
        }}
      />
    );
  } else {
    template = <AuthProvider value={userApi}>{children}</AuthProvider>;
  }
  return template;
};

export { Authentication, AuthContext };
