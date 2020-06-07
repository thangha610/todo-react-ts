interface ITodoItem {
    title: string,
    isCompleted: boolean
}

interface ITodoItemProps {
    todo : ITodoItem;
    // onSave: (val: any) => void;
    onDestroy: () => void;
    // onEdit: ()  => void;
    // onCancel: (event : any) => void;
    onToggle: () => void;
}

interface ITodoItemState {
    editText: string;
}

interface ITodoApp {
    handleNewTodoKeyDown: (event: React.KeyboardEvent) => void;
    addTodoItem:(val: string) => void;
    toggle: (item: ITodoItem) => void;
    toggleAll: () => void;
    destroy:(item: ITodoItem) => void;
}

interface ITodoAppProps {}

interface ITodoAppState {
    todoItems: Array<ITodoItem>;
}
