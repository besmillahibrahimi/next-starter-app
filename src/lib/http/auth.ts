import Parse from '@/configs/http'


interface ISignUp {
    fullname: string;
    username: string; 
    email: string;
    password: string;
}


export function SignUpAPI(params: ISignUp): Promise<Parse.User<ISignUp>> {

    const user = new Parse.User<ISignUp>(params);
  
  return user.signUp();
}
