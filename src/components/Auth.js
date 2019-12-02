import React, { useState } from 'react';
import auth0 from 'auth0-js';

import { AUTH_CONFIG } from '../auth0-variables';
import { AuthProvider } from '../authContext';

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: 'token id_token',
});

const Auth = props => {
  const [state, setState] = useState({
    authenticated: false,
    accessToken: '',
    user: {
      role: 'visitor',
    },
  });

  const initiateLogin = () => auth.authorize();

  const logOut = () =>
    setState({
      authenticated: false,
      accessToken: '',
      user: {
        role: 'visitor',
      },
    });

  const setSession = data =>
    setState({
      authenticated: true,
      accessToken: data.accessToken,
      user: {
        id: data.sub,
        email: data.email,
        role: data[AUTH_CONFIG.roleUrl],
      },
    });

  const handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} occured`);
        return;
      }

      setSession(authResult.idTokenPayload);
    });
  };

  return (
    <AuthProvider
      value={{
        ...state,
        initiateLogin,
        handleAuthentication,
        logOut,
      }}
    >
      {props.children}
    </AuthProvider>
  );
};

export default Auth;
