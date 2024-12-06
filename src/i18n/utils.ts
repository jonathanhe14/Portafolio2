import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    // Retornamos una función que toma la clave de traducción
    return function t(key: keyof typeof ui[typeof defaultLang]): string {
      // Verificamos si el idioma existe en el objeto `ui`
      if (lang in ui) {
        // Intentamos obtener la traducción para la clave específica
        const translation = ui[lang][key];
        if (translation) {
          return translation; // Retornamos la traducción si existe
        }
      }
      
      // Si no hay traducción en el idioma actual, retornamos la del idioma por defecto
      return ui[defaultLang][key] || `Missing translation: ${key}`;
    };
  }
