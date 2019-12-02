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

  const logout = () =>
    setState({
      authenticated: false,
      accessToken: '',
      user: {
        role: 'visitor',
      },
    });

  const setSession = authResult =>
    setState({
      authenticated: true,
      accessToken: authResult.accessToken,
      user: {
        id: authResult.idTokenPayload.sub,
        email: authResult.idTokenPayload.email,
        role: authResult.idTokenPayload[AUTH_CONFIG.roleUrl],
      },
    });

  const handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} occured`);
        return;
      }

      setSession(authResult);
    });
  };

  return (
    <AuthProvider
      value={{
        ...state,
        initiateLogin,
        handleAuthentication,
        logout,
      }}
    >
      {props.children}
    </AuthProvider>
  );
};

export default Auth;
