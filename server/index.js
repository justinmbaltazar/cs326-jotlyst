import express from 'express';
import logger from 'morgan';
import cors from 'cors'; 
/* 
The cors import is used to enable CORS (Cross-Origin Resource Sharing), 
which allows us to send a request from the front-end hosted on one port 
to a back-end hosted on another port for testing purposes. Redundant in prod.
*/
import { Database } from './database.js';

class Server {
    constructor(dburl) {
        this.dburl = dburl;
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(logger('dev'));
        this.app.use('/', express.static('client'));
        this.app.use(cors());
    }

    async initRoutes() {
        const self = this;

        this.app.get('/test', (req, res) => {
            res.send('Hello World!');
        });

        this.app.get('/api/tasks', async (req, res) => {
            const tasks = await self.db.getAllTasks();
            res.send(tasks);
        });

        this.app.get('/api/tasks/:name', async (req, res) => {
            const name = req.params.name;
            const task = await self.db.getTask(name);
            res.send(task);
        });

        this.app.post('/api/tasks', async (req, res) => {
            try {
                const task = await self.db.addTask(req.body);
                res.send(task);
            }
            catch (err) {
                res.sendStatus(500);
            }
        });

        this.app.put('/api/tasks/:name', async (req, res) => {
            const name = req.params.name;
            const task = await self.db.updateTask(name, req.body);
            res.send(task);
        });
        
        this.app.delete('/api/tasks/:name', async (req, res) => {
            const name = req.params.name;
            const task = await self.db.deleteTask(name);
            res.send(task);
        });

        this.app.get('/api/tasks/priority/:priority', async (req, res) => {
            const tasks = await self.db.getAllTasksByPriority(req.params.priority);
            res.send(tasks);
        });

        this.app.get('/api/tasks/completed/:completed', async (req, res) => {
            const tasks = await self.db.getAllTasksByCompleted(req.params.completed);
            res.send(tasks);
        });
    }
    async initDb() {
        this.db = new Database(this.dburl);
        await this.db.connect();
    }

    async start() {
        await this.initDb();
        await this.initRoutes();
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}

const server = new Server(process.env.DB_URL);
server.start();