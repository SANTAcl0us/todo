import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const saveData = (newTodos) => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    useEffect(() => {
        if (localStorage.getItem("todos")) {
            setTodos(JSON.parse(localStorage.getItem("todos")));
        }
    }, []);

    const onAddTodo = () => {
        if (newTodo.trim()) {
            let newTodos = [...todos, { todo: newTodo.trim(), id: Date.now() }];
            setTodos(newTodos);
            setNewTodo("");
            saveData(newTodos);
        }
    };

    const deleteTodo = (id) => {
        let newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);

        saveData(newTodos);
    };

    return (

        <Flex flexDirection={"column"} alignItems={"center"}>
            <Text fontSize={40}>Todo</Text>

                    <Text>
                            <Input
                                border={"none"}
                                outline={"none"}
                                borderRadius={10}
                                fontSize={20}
                                height={45}
                                width={500}
                                type="text"
                                id="todoInput"
                                placeholder="add todo"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                onKeyUp={(e) => {
                                    e.key == "Enter" ?  onAddTodo()  : "";
                                }}
                            />
                            <Button
                                _hover={{ bg: "white", color: "blue" }}
                                fontSize={25}
                                bg={"blue"}
                                h={48}
                                w={100}
                                color="white"
                                borderRadius={10}
                                onClick={onAddTodo}
                            >
                                {" "}
                                Add
                            </Button>
                    </Text>
                    {todos.map((todo) => (
                        <Flex alignItems={'center'} w={600} justifyContent={'space-between'}  key={todo.id}>
                            <Box>{todo.todo}</Box>
                                <Button
                                    _hover={{ bg: "white", color: "red" }}
                                    fontSize={25}
                                    borderRadius={10}
                                    bg={"red"}
                                    h={45}
                                    w={100}
                                    color={"white"}
                                    colorScheme="red"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    {" "}
                                    Delete{" "}
                                </Button>{" "}
                            </Flex>
                    ))}
        </Flex>
    );
                    }

export default TodoList
