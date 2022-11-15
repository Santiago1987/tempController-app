import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    height: 70px;
    background-color: #23394d;
    z-index: 9999;
`;

export const Wrapper = styled.div`
    width: 100%;
    max-width: 1300px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: auto;
    z-index: 9999;
`;

export const LogoLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;   
    cursor: pointer;    
    text-decoration: none;   
`

export const LogoContainer = styled.div`
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-family: "RobotoCondensed-Bold", sans-serif;

    h3{
       color: #fff;
       margin: 0;
    }

    svg{
        fill: #79ade8;
        margin-right: 0.5rem;
    }
`;

export const Menu = styled.ul`
    height: 100%;
    display: flex;
    justify-content: space-between;
    list-style: none;
    z-index: 9999;

    @media screen and (max-width: 960px){
        background-color: #23394d;
        position: absolute;
        top: 70px;
        left: ${({open}) => open ? 0 : "-100%"};
        width: 100%;
        height: 90vh;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        transition: 0.5s all ease;
        z-index:9999;
    }
`;

export const MenuItem = styled.li`
    height: 100%;

    @media screen and (max-width: 960px){
        width: 100%;
        height:70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const MenuItemLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0.5rem 2.5rem;
    color: #fff;
    font-family: "RobotoCondensed-Regular", sans-serif;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.5s all ease;
    text-decoration: none;

    &:hover {
        color: #fff;
        background-color: #79ade8;
        transition: 0.5 all easy;

        div{
            svg{
                fill: #23394d;
            }
        }
    }
    div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            display: none;
            fill:  #79ade8;
            margin-right: 0.5rem;
        }

    }

    @media screen and (max-width: 960px){
        width:100%;

        div {
            width:30%;
            justify-content: left;

            svg {
                display: flex;
            }
        }
    }
    @media screen and (max-width: 880px) {
        div {
          width: 40%;
          justify-content: left;
          svg {
            display: flex;
          }
        }
      }
      @media screen and (max-width: 500px) {
        div {
          width: 60%;
          justify-content: left;
          svg {
            display: flex;
          }
        }
      }
      @media screen and (max-width: 260px) {
        div {
          width: 100%;
          justify-content: left;
          svg {
            display: flex;
          }
        }
      }

`

export const MobileIcon = styled.div`
    display:none;

    @media screen and (max-width: 960px){
        display: flex;
        align-items: center;
        cursor: pointer;

        svg{
            fill: #79ade8;
            margin-right: 0.5rem;
        }
    }
`