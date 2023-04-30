

interface CodeDisplayProps {
    text: string
}

function CodeDisplay({ text }: CodeDisplayProps) {

    const regex = /```([^`]*)```/;
    const codeMatch = text.match(regex);
    const code = codeMatch?.[1];

    return (
        <div className="code-display">
            <div className="buttons">
                <div className="button first"></div>
                <div className="button middle"></div>
                <div className="button last"></div>
            </div>
            <div className="code-output">
                <p>{code}</p>
            </div>
        </div>
    )
}

export default CodeDisplay;