export default {
  url: 'https://2jdzbiazhj.execute-api.us-east-2.amazonaws.com/v1',
  apiKey: '2n0xxJhh3J7TPf0nnaA79abj2PnyAKdi3ceYuguE',
  apiGateway: {
    REGION: 'us-east-2',
  },
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_7QOY8LLUR',
    userPoolWebClientId: '1e0mgqh3cks7v8bafvfnk7091s',
    identityPoolId: 'us-east-2:e29013b6-6d72-4e8b-894f-4c97c88b4986',
    host: 'emasters.auth.us-east-2.amazoncognito.com',
  },
  socialLogin: {
    google: {
      appId:
        '275431223291-305m0fpg5c0urgkjl2jfv6g52dvsijdk.apps.googleusercontent.com',
    },
    facebook: {
      appId: '3109535892451628',
    },
  },
  oauth: {
    domain: 'emasters.auth.us-east-2.amazoncognito.com',
    redirectSignIn: 'http://localhost:3000/social-login-callback',
    redirectSignOut: 'http://localhost:3000/',
    scope: [
      'phone',
      'email',
      'profile',
      'openid',
      'aws.cognito.signin.user.admin',
    ],
    responseType: 'code',
  },
  firebase: {
    apiKey: 'AIzaSyBEbSzesVr5HD4_iy9TlyAfUsyzyahKt9c',
    authDomain: 'emasters-4e6b5.firebaseapp.com',
    databaseURL: 'https://emasters-4e6b5.firebaseio.com',
    projectId: 'emasters-4e6b5',
    storageBucket: 'emasters-4e6b5.appspot.com',
    messagingSenderId: '275431223291',
    appId: '1:275431223291:web:9f9b2c6eb655bed1',
  },
}
