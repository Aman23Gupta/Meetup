import * as Font from "expo-font";
export const cachedFonts = fonts => fonts.map(font => Font.loadAsync(font));