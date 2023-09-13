import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import App from './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';



function Todo1(){
    const [todos, setTodos] = React.useState([]);
    const [newTodo, setNewTodo] = React.useState({
      title: "",
    });
    const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const day = currentTime.getDate()
  const month=currentTime.getMonth()
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
    React.useEffect(() => { 
        fetch("http://localhost:3000/todos", {
          method: "GET",
        }).then((response) => {
          response.json().then((data) => {
            console.log(data);
            setTodos(data);
          });
        });
      }, []);
    const date = new Date()
    const handleAddTodo = () => {
        if (!newTodo.title.trim()) {
          alert("Please enter a todo");
          return;
        }
    
        // Check if the number of existing todos is less than 5
        if (todos.length < 4) {
          fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo),
          }).then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setTodos((prevTodos) => [...prevTodos, data]);
              });
              setNewTodo({
                title: ""
              });
            } else {
              console.error("Error adding todo");
            }
          });
        } else {
          alert("Can't add more tasks");
        }
      };
    

      const handleDelete = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
          } else {
            console.error("Error deleting todo");
          }
        });
      };

 return (
    <div style={{
        backgroundImage:'url("src/images/milad-fakurian-E8Ufcyxz514-unsplash.jpg")',backgroundPosition: 'center',
        backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width:'100vw',height:'100vh',margin:"-8px",
        display:"flex",padding:0,justifyContent:"center",flexDirection:"column",alignItems:"center"
        }}>
        <Card style={{
            display:"flex",flexDirection:"column",alignItems:"center",height:500,width:700,backdropFilter: "blur(60px)",
            backgroundColor: "rgba(255, 255, 255, 0.25)",borderRadius: 20,boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
                <div style={{display:"flex",justifyContent:"flex-start",width:"100%"}}>
                    <div style={{display:"flex",width:200,backgroundColor:"rgba(255, 255, 255, 0.4)",height:500,
                            justifyContent:"center",alignItems:"center", backdropFilter:"blur(60px)"}}>
                        <p class="calendar">{day} <em>{monthNames[month]}</em></p>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                        <h3 style={{marginLeft:50,fontSize:"23px"}}>TODO's</h3>
                        </div>
                        <div style={{ marginTop: "0px", height: "300px" }}>
                        {todos.map((todo) => (
                        <div key={todo.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <button style={{background:"none",border:"0px",cursor:"pointer",marginLeft:40,
                        color:"rgba(47, 35, 99, 0.7)"
                    }} onClick={() => handleDelete(todo.id)}><i class="gg-remove"></i></button>
                        <h3
                            style={{border: "1.4px solid rgba(47, 35, 99, 0.7)", borderRadius: "10px", fontFamily: "Roboto Mono",
                            color: "#010217D3",backgroundColor: "rgba(246, 227, 255, 0.13)",paddingLeft:10,
                            textShadow:"0.2px 0.2px #76A9C4DD",height: 33,width: "30ch",marginLeft: "3px", paddingTop:5,
                            fontWeight:"normal"
                            }}>
                            {todo.title}
                        </h3>
                        <div style={{color:"pink"}}>
                            <Checkbox icon={<BookmarkBorderIcon />}/>
                        </div>
                        </div>
                          ))}
                        </div>

                        <div style={{marginTop:"0px",height:"10ch"}}>
                            <input placeholder='Add new task' style={{border:"0px solid blue",borderRadius:13,
                            marginLeft:"65px",
                            width:"48ch",height:44,opacity:"0.84",marginTop:"50px"}} value={newTodo.title}
                            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}></input>

                            <button style={{position: "absolute",backgroundColor: "transparent", border: "none", 
                            marginLeft:"-38px",marginTop:"60px",border:"0px"}}
                            onClick={handleAddTodo}><i class="gg-add"></i></button>
                        </div>
                    </div>
                </div>
            
        </Card>
    </div>
 )
}
export default Todo1;