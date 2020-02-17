import JssssKit, {useState} from './JssssKit';

const Child = ({onClick}) => (
    <div onClick={onClick} style='width : 20px; height : 20px; background: red;'>

    </div>
);
const Parent = ({children, onClick}) => {
    const [elems, createElem] = useState([]);

    // const deleteChild = (k) => {
    //     elems = elems.filter( c => c.props.key !== k)
    // };
    const handleCreation = () => {

        createElem(
            children => {
                const k = Math.random();
                return [...children, <Child key={k}/>];
            }
        )
    };
    return(
        <div style='min-width:20px; min-height:20px; background: blue;'
             onClick={ handleCreation}>
            {elems}
        </div>
    )
};
export default Parent
