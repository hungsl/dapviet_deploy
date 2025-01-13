export interface SocialLoginButtonProps {
    provider: 'Google' | 'Facebook';
    icon: string;
    message: string;
  }
  
  export interface InputFieldProps {
    icon: string;
    placeholder: string;
    type?: 'text' | 'email' | 'password';
  }