import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type AddItemFormType = {
    addTaskApp: (newTitle: string) => void
}
export const AddItemForm = (props:AddItemFormType) => {
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
          <input
              style={{border: error ? 'solid 1px red' : ''}}
              value={titleInput}
              onChange={onChangeTitle}
              onKeyUp={enterPress}
          />
          <button onClick={addTask}>+</button>
          {error && <div style={{color: 'red'}}>{error}</div>}
      </div>
  )
}