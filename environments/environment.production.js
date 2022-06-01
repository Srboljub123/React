export default {
  url: 'https://1cp0z0f3p7.execute-api.us-east-2.amazonaws.com/v1',
  apiKey: 'UvJU6OLpho7pJKNSS3leD9ftUaMchgR44Z470f6k',
  apiGateway: {
    REGION: 'us-east-2',
  },
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_bww88YN5I',
    userPoolWebClientId: '3205d8fe7drdhm3fvcjtqj6phk',
    host: 'proak.auth.us-east-2.amazoncognito.com',
  },
  socialLogin: {
    google: {
      appId:
        '275431223291-305m0fpg5c0urgkjl2jfv6g52dvsijdk.apps.googleusercontent.com',
    },
    facebook: {
      appId: '197075781023459',
    },
  },
  oauth: {
    domain: 'proak.auth.us-east-2.amazoncognito.com',
    redirectSignIn: 'https://www.emastersapp.com/social-login-callback',
    redirectSignOut: 'https://www.emastersapp.com/',
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
    apiKey: 'AIzaSyAmE16o76vnpgdauwjm7dK4RzIiicQxgfs',
    authDomain: 'emasters-prod-199619.firebaseapp.com',
    databaseURL: 'https://emasters-prod-199619.firebaseio.com',
    projectId: 'emasters-prod-199619',
    storageBucket: 'emasters-prod-199619.appspot.com',
    messagingSenderId: '660294292736',
    appId: '1:660294292736:web:c0447463f30ff9a7',
  },
}
