const stripUrls = (text: string) => text.replace(/https?:\/\/\S+/g, "[link removed]");

export const sanitizeContent = (content: unknown) => {
  if (!content || typeof content !== "object") {
    return content;
  }
  const serialized = JSON.stringify(content);
  const cleaned = stripUrls(serialized);
  return JSON.parse(cleaned);
};
