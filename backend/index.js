import connectDb from './utils/db.js';
import app from './app.js';

const PORT=process.env.PORT || 8000;
connectDb();
app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
});