import { createGlobalStyle } from "styled-components";

export const COLORS = {
  white: "#FFF",
  textPrimary: "#010101",
  disabled: "#BEC3C6",
  primary: "#362EE6",
  secondary: "#7265FC",
  tertiary: "#F7F5FA",
  success: "#02BE96",
  pending: "#FDB037",
  error: "#FE3C45",
};

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Nunito:400');
 /* css reset */
 html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

html {

  font-family: "Nunito", sans-serif;
  font-weight: 400;

    background-color: ${COLORS.tertiary};
    --white:${COLORS.white};
    --text: ${COLORS.textPrimary};
    --disabled: ${COLORS.disabled};
    --primary: ${COLORS.primary};
    --secondary: ${COLORS.secondary};
    --tertiary: ${COLORS.tertiary};
    --success: ${COLORS.success};
    --pending: ${COLORS.pending};
    --error: ${COLORS.error};
}


h1, h2, h3, h4, h5 {
  color: var(--text);
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  line-height: 1.3;
}

h1 {
  font-weight: 800;
  font-size: 2.488rem;
}

h2 {font-size: 2.074rem; font-weight: 600;}

h3 {font-size: 1.728rem; font-weight: 400;}

h4 {font-size: 1.44rem;}

h5 {font-size: 1.2rem;}

input, select {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
}

`;
