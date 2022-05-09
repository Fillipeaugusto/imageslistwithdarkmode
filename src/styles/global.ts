import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family:Montserrat, sans-serif ;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontSizes.large}
  }

  /* h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  } */

  button {
    cursor: pointer;
  }

.search-form {
  width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
}

.search-input {
  width: 100%;
	background-color: transparent;
	border: none;
	height: 63px;
	color: #fff;
	font-size: 15px;
	font-weight: 700;
}

.search-form-input{
  width: 100%;
	max-width: 598px;
	display: flex;
	border-radius: 50px;
	align-items: center;
	justify-content: center;
	background-color: #565656;
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 40px;
}


`;
