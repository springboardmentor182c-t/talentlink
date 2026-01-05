const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const extractImagePath = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (typeof image === "object") {
    if (typeof image.url === "string") return image.url;
    if (typeof image.path === "string") return image.path;
  }
  return "";
};

export const resolveProfileImage = (image) => {
  const source = extractImagePath(image);
  if (!source) return null;
  return source.startsWith("http") ? source : `${API_BASE_URL}${source}`;
};

export const avatarFallback = (name = "User", background = "1d4ed8", color = "ffffff") => {
  const safeName = name?.trim() || "User";
  return `https://ui-avatars.com/api/?background=${background}&color=${color}&name=${encodeURIComponent(safeName)}`;
};

export const profileImageOrFallback = (image, name, options = {}) => {
  const resolved = resolveProfileImage(image);
  if (resolved) return resolved;
  return avatarFallback(name, options.background, options.color);
};

export default resolveProfileImage;
