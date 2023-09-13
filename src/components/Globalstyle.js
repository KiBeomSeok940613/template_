
import { createGlobalStyle } from 'styled-components'
// 전체 스타일 import

const Globalstyle = 
createGlobalStyle`
    *{margin: 0; padding: 0%; font-family: 'Humanbumsuk';}
    ul{list-style: none}
    a{text-decoration: none; color: #000}
/* 스타일 컴포넌트는 백틱 필수 */
`



export default Globalstyle