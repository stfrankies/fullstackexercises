interface ContentProps {
    name: string;
    exerciseCount: number;
    description?: string;
    kind: string;
    requirements: string[];
}

const Content = (props : ContentProps) => {
  return (
    <p><b>{props.name +" "+props.exerciseCount}</b>
        <br/><i>{props.description}
        <br/>{props.kind}</i>
        <br/>required skills: {props.requirements.join(", ")}
    </p>
  )
};


export default Content