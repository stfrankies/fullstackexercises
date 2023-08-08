
interface HeaderProps {
    heading: string;
}

const Header = (props : HeaderProps) => {
  return <h1>Hello, {props.heading}</h1>;
};


export default Header