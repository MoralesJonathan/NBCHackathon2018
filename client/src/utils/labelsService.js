import labels from "./labels.json";
let languageLabels = labels.english;
export default {
  translate: function (labelName) {
    return languageLabels[labelName];
  },
  setLanguage(language="english") {
    languageLabels = labels[language];
  }
};