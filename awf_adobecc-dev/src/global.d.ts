declare module "*.jpg" {
  export default "" as string;
}
declare module "*.png" {
  export default "" as string;
}
declare module "*.svg" {
  export default "" as string;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
