export const sanitizeText = (text) => { 
  if (!text) return '';

  let cleaned = text.replace(/<\/?[^>]+(>|$)/g, '');

  cleaned = cleaned.replace(/javascript:/gi, '[removed]');
  cleaned = cleaned.replace(/data:text\/html/gi, '[removed]');
  cleaned = cleaned.replace(/vbscript:/gi, '[removed]');

  cleaned = cleaned.replace(/\son\w+\s*=\s*(['"]).*?\1/gi, '[removed]');
  cleaned = cleaned.replace(/\son\w+\s*=\s*[^ >]+/gi, '[removed]');

  const dangerousKeywords = ['script', 'style', 'iframe', 'embed', 'object', 'form', 'img', 'svg'];
  dangerousKeywords.forEach((kw) => {
    const regex = new RegExp(kw, 'gi');
    cleaned = cleaned.replace(regex, `[${kw}]`);
  });

  cleaned = cleaned.replace(/&#[xX]?[0-9a-fA-F]+;/g, '[entity]');

  // localhost ve port bilgilerini temizle
  cleaned = cleaned.replace(/http:\/\/localhost:\d+/gi, '[removed]');

  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();

  return cleaned;
};
