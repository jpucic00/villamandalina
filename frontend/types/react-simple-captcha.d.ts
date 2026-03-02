declare module "react-simple-captcha" {
  export function loadCaptchaEnginge(length: number): void;
  export function LoadCanvasTemplate(props?: { reloadColor?: string }): JSX.Element;
  export function validateCaptcha(userValue: string, reload?: boolean): boolean;
}
