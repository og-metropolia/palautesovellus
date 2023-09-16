export default function Question(props) {
    return (
        <div>
            <h1 style={{color: props.fgColor, backgroundColor : props.bgColor}}>{ props.content }</h1>
        </div>
    )
}
