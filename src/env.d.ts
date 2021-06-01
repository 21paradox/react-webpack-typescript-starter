
// 支持 *.module.less
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
