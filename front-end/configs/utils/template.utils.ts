// import { defaultTemplate } from './../../template/defaultTemplate';
// export const resumeTemplate = {
//     1: defaultTemplate
// }

import Template01 from '../../template/template-01';

export type PageProps = {
    page: number;
  };
export const addHttp = (url: string) => {
    if (url.search(/^http[s]?:\/\//) == -1) {
      url = 'http://' + url;
    }
  
    return url;
  };
