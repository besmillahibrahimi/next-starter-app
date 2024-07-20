import Parse from '@/configs/http'
import { useRouter } from 'next/router';


interface ISignUp {
    fullname: string;
    username: string; 
    email: string;
    password: string;
}

interface ISignIn {
  username: string; 
  password: string;
}


export function SignUpAPI(params: ISignUp): Promise<Parse.User<ISignUp>> {

    const user = new Parse.User<ISignUp>(params);
  
  return user.signUp();
}


export function SignInAPI(params: ISignIn): Promise<Parse.User<ISignIn>> {
  console.log(' user -  hii iii ii ii   ', )
  
    const user = new Parse.User<ISignIn>(params);
    user.logIn()
    
  return user.logIn();
}


export const isAuthenticated = () => Parse.User.current()?.authenticated;

export function LogOutAPI() {
  const user = Parse.User.logOut()

  return user;
}