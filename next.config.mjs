// Untuk repo "username.github.io" tidak perlu basePath.
// Untuk repo bernama lain, set NEXT_PUBLIC_BASE_PATH=/nama-repo saat build.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export default { output: "export", images: { unoptimized: true }, trailingSlash: true, basePath };
