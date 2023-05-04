import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "@mui/material/Button";
import {styleBtn} from "./todoList/TodoList";
import TextField from '@mui/material/TextField';

export type AddItemFormType = {
    addTaskApp: (newTitle: string) => void
}
export const styleTextField = {
    padding: '0',
    maxHeight: '38px',
    minHeight: '38px',
}

export const AddItemForm = (props: AddItemFormType) => {
    const [error, setError] = useState<string | null>(null)
    const [titleInput, setTitleInput] = useState<string>('')

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }
    const addTask = () => {
        if (titleInput !== '') {
            props.addTaskApp(titleInput.trim())
            setTitleInput('')
        } else {
            setError('The title is required')
        }
    }
    const enterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
        setError(null)
    }
    return (
        <div>
            <TextField
                size={'small'}
                style={styleTextField}
                id="outlined-multiline-flexible"
                label={error ? error :'Please type here...'}
                value={titleInput}
                onChange={onChangeTitle}
                onKeyUp={enterPress}
                error={!!error ? !!error : !!null}
            />
            <Button onClick={addTask} size="small" variant="contained" style={styleBtn}>+</Button>
        </div>
    )
}