import { useEffect, useState } from "react"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Bloc() {
     const [taskList, setTaskList] = useState([]);
     const [loading, setLoading] = useState(true);
     const [open, setOpen] = useState(false);
     const [newTask, setNewTask] = useState("");
     const [newDeadline, setNewDeadline] = useState("");
     const [isDone, setIsDone] = useState(0);

     const handleClickOpen = () => {
          setOpen(true);
     };

     const handleClose = () => {
          setOpen(false);
     };

     /*const handleCheck = () => {
          setIsDone(1);
     }*/

     const handleNewTaskChange = (e) => {
          setNewTask(e.target.value);
     }

     const handleNewDeadlineChange = (e) => {
          setNewDeadline(e.target.value);
     }

     const handleAddTask = () => {
          const formData = new FormData();
          formData.append("tache", newTask);
          formData.append("isDone", "0");
          formData.append("for", newDeadline);

          const requestOptions = {
               method: 'POST',
               body: formData
          };

          fetch('http://localhost:3000/kraaakilo_pratice/backend/addTask.php', requestOptions)
               .then(response => response.json())
               .then(datas => console.log(datas))
          // console.log(datas);
     }

     const handleDeleteTask = (id) => {
          const formData = new FormData();
          formData.append("id", id);

          const requestOptions = {
               method: 'POST',
               body: formData
          };

          fetch('http://localhost:3000/kraaakilo_pratice/backend/deleteTask.php', requestOptions)
               .then(response => response.json())
               .then(datas => console.log(datas))
          // console.log(datas);
     }

     const handleCheckTask = (id) => {
          const formData = new FormData();
          formData.append("id", id);

          const requestOptions = {
               method: 'POST',
               body: formData
          };

          fetch('http://localhost:3000/kraaakilo_pratice/backend/checkTask.php', requestOptions)
               .then(response => response.json())
               .then(datas => console.log(datas))
          // console.log(datas);
     }


     useEffect(() => {
          const getList = () => {
               fetch('http://localhost:3000/kraaakilo_pratice/backend/getAllTask.php')
                    .then(response => response.json())
                    .then((data) => {
                         //console.log(data);
                         setTaskList(data);
                         setLoading(false);
                    })
                    .catch(console.error())
          }
          getList();

     }, [])
     return (
          <div className="w-1/2 m-auto">
               <div className="flex">
                    <h2 className="text-2xl font-semibold">Todo</h2>
                    <Button variant="contained" onClick={handleClickOpen}>
                         Add
                    </Button>
               </div>

               <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add a new task</DialogTitle>
                    <DialogContent>
                         <TextField
                              margin="dense"
                              id="name"
                              label="Your task"
                              type="text"
                              fullWidth
                              variant="standard"
                              value={newTask}
                              onChange={handleNewTaskChange}
                         />
                         <TextField
                              margin="dense"
                              id="name"
                              label="Deadline"
                              type="text"
                              fullWidth
                              variant="standard"
                              value={newDeadline}
                              onChange={handleNewDeadlineChange}
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose}>Cancel</Button>
                         <Button onClick={() => {
                              handleAddTask();
                              setNewTask("");
                              setNewDeadline("");
                         }}>Subscribe</Button>
                    </DialogActions>
               </Dialog>
               <ul>
                    {loading ? <p>Chargement</p> : taskList.map(task => (
                         task.completed === 0 ?
                              <div className="border-2 border-sky-300 m-4 px-3 py-2 flex rounded-xl">
                                   <div className="">
                                        <Checkbox color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} onChange={(e) => {
                                             e.preventDefault();
                                             handleCheckTask(task.id)
                                        }} />
                                   </div>
                                   <div className="ml-2">
                                        <li key={task.id} className=" font-bold"> {task.content} </li>
                                        <span className="font-light text-sm">{task.deadline} </span>
                                   </div>
                                   <div>
                                        <IconButton aria-label="delete" size="large" onClick={(e) => {
                                             e.preventDefault();
                                             handleDeleteTask(task.id);
                                        }}>
                                             <DeleteIcon fontSize="inherit" color="success" />
                                        </IconButton>
                                   </div>
                              </div>
                              : null
                    ))}
               </ul><hr />
               <h2 className="text-xl font-semibold">Completed</h2>
               <ul>
                    {loading ? <p>Chargement</p> : taskList.map(task => (
                         task.completed === 1 ?
                              <div className="border-2 border-sky-300 m-4 px-3 py-2 flex rounded-xl">
                                   <div className="">
                                        <Checkbox color="success" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} checked />
                                   </div>
                                   <div className="ml-2">
                                        <li key={task.id} className="line-through font-bold"> {task.content} </li>
                                        <span className="font-light line-through text-sm">Today</span>
                                   </div>
                              </div>
                              : null))}
               </ul>
          </div>
     )
}