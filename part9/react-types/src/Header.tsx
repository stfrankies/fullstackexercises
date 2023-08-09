
interface HeaderProps {
    heading: string;
}

const Header = (props : HeaderProps) => {
  return <>Hello, {props.heading}</>;
};


export default Header