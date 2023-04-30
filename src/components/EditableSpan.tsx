import React, {ChangeEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    updateTitleSpan: (title: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    const [changeTeg, setChangeTeg] = useState(false)
    const [newInput, setNewInput] = useState<string>(props.title)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewInput(e.currentTarget.value)
    }
    const changeTitleToInput = () => {
        setChangeTeg(!changeTeg)
    }
    const setNewTitle = () => {
        setChangeTeg(!changeTeg);
        props.updateTitleSpan(newInput)
    }
    return (
        <>
            {changeTeg
                ? <input value={newInput} onChange={onChangeInput} autoFocus onBlur={setNewTitle}/>
                : <span onDoubleClick={changeTitleToInput}>{props.title}</span>
            }
        </>

    )
}