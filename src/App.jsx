import Todo1 from "./Todo1";


function App(){
    return (
        <div style={{
            backgroundImage:'url("src/images/milad-fakurian-E8Ufcyxz514-unsplash.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            margin:-"-8px"
            }}>
                {<Todo1/>}
        </div>
        
    );
}
export default App;

