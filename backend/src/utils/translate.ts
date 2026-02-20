import * as deepl from "deepl-node";

const authKey = process.env.DEEPL_API_KEY || "";
const translator = new deepl.Translator(authKey);

function detectLanguage(text: string): "ko" | "en" {
  const stripped = text.replace(/<[^>]*>/g, "").replace(/\s/g, "");
  const koreanRegex = /[\uAC00-\uD7A3\u3131-\u3163\u314F-\u3163]/g;
  const koreanMatches = stripped.match(koreanRegex);
  const koreanRatio = koreanMatches ? koreanMatches.length / stripped.length : 0;
  return koreanRatio > 0.3 ? "ko" : "en";
}

function protectCodeBlocks(html: string): { text: string; blocks: string[] } {
  const blocks: string[] = [];
  const text = html.replace(/<pre[\s\S]*?<\/pre>/gi, (match) => {
    blocks.push(match);
    return `__CODE_BLOCK_${blocks.length - 1}__`;
  });
  return { text, blocks };
}

function restoreCodeBlocks(text: string, blocks: string[]): string {
  return text.replace(/__CODE_BLOCK_(\d+)__/g, (_, index) => blocks[Number(index)]);
}

export async function translatePost(
  title: string,
  content: string
): Promise<{
  language: "ko" | "en";
  translatedTitle: string;
  translatedContent: string;
}> {
  const language = detectLanguage(title + " " + content);
  const targetLang = language === "ko" ? "en-US" : "ko";
  const sourceLang = language === "ko" ? "ko" : "en";

  const titleResult = await translator.translateText(title, sourceLang, targetLang as deepl.TargetLanguageCode);
  const translatedTitle = titleResult.text;

  const { text: protectedContent, blocks } = protectCodeBlocks(content);
  const contentResult = await translator.translateText(protectedContent, sourceLang, targetLang as deepl.TargetLanguageCode);
  const translatedContent = restoreCodeBlocks(contentResult.text, blocks);

  return { language, translatedTitle, translatedContent };
}
